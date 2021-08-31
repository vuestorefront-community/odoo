# -*- coding: utf-8 -*-

from datetime import datetime
import graphene
from graphql import GraphQLError
from odoo import _
from odoo.osv import expression

from odoo.addons.graphql_vuestorefront.schemas.objects import PaymentAcquirer, Order


class PaymentQuery(graphene.ObjectType):
    payment_acquirers = graphene.List(
        graphene.NonNull(PaymentAcquirer),
        required=True,
        order_id=graphene.Int(),
    )

    def resolve_payment_acquirers(self, info, order_id):
        env = info.context["env"]
        order = env['sale.order'].search([('id', '=', order_id)], limit=1)
        if not order:
            raise GraphQLError(_("Sale Order does not exist."))
        website = env['website'].get_current_website()
        domain = expression.AND([
            ['&', ('state', 'in', ['enabled', 'test']), ('company_id', '=', order.company_id.id)],
            ['|', ('website_id', '=', False), ('website_id', '=', website.id)],
            ['|', ('country_ids', '=', False), ('country_ids', 'in', [order.partner_id.country_id.id])]
        ])
        return env['payment.acquirer'].search(domain)


def validate_expiry(expiry_month, expiry_year):
    # Validate expiry month and year
    if expiry_month > 12 or expiry_month < 1:
        raise GraphQLError(_('Invalid Month'))

    cc_expiry = '%s / %s' % ("{:02d}".format(expiry_month), expiry_year)

    expiry_date = datetime.strptime(cc_expiry, '%m / %Y').strftime('%Y%m')

    if datetime.now().strftime('%Y%m') > expiry_date:
        raise GraphQLError(_('Invalid Month / Year'))
    return cc_expiry


def prepare_payment_transaction(env, data, payment_acquire, order):
    payment_token = payment_acquire.ogone_s2s_form_process(data)

    # create normal s2s transaction
    transaction = env['payment.transaction'].sudo().create({
        'amount': order.amount_total,
        'acquirer_id': payment_acquire.id,
        'type': 'server2server',
        'currency_id': order.currency_id.id,
        'reference': order.name,
        'payment_token_id': payment_token.id,
        'partner_id': order.partner_id.id,
        'sale_order_ids': [(6, 0, order.ids)]

    })
    return transaction


class MakePayment(graphene.Mutation):
    class Arguments:
        payment_acquire_id = graphene.Int(required=True)
        order_id = graphene.Int(required=True)
        expiry_month = graphene.Int(required=True)
        expiry_year = graphene.String(required=True)
        holder_name = graphene.String(required=True)
        card_number = graphene.String(required=True)
        cvc = graphene.String(required=True)
        brand = graphene.String(required=True)

    Output = Order

    @staticmethod
    def mutate(self, info, payment_acquire_id, order_id, expiry_month, expiry_year,
               holder_name, card_number, cvc, brand):
        env = info.context['env']
        cc_expiry = validate_expiry(expiry_month, expiry_year)

        order = env['sale.order'].sudo().search([('id', '=', order_id)], limit=1)
        if not order:
            raise GraphQLError(_('Sale Order does not exist.'))

        payment_acquire = env['payment.acquirer'].sudo().search([('id', '=', payment_acquire_id)], limit=1)
        if not payment_acquire:
            raise GraphQLError(_('Payment Acquire does not exist.'))

        data = {
            'cc_number': card_number,
            'cc_cvc': cvc,
            'cc_holder_name': holder_name,
            'cc_expiry': cc_expiry,
            'cc_brand': brand,
            'acquirer_id': payment_acquire_id,
            'partner_id': order.partner_id.id
        }
        transaction = prepare_payment_transaction(env, data, payment_acquire, order)

        params = {'CVC': cvc, '3d_secure': True}
        transaction.ogone_s2s_do_transaction(**params)

        # check if transaction is done confirm sale order and create invoice
        if transaction.state == 'done':
            transaction._post_process_after_done()
        else:
            raise GraphQLError(_(transaction.state_message))
        return order


class PaymentMutation(graphene.ObjectType):
    make_payment = MakePayment.Field(description='Creates a new payment request.')
