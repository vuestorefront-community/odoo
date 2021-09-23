# -*- coding: utf-8 -*-

from datetime import datetime

import graphene
from graphene.types import generic
from graphql import GraphQLError
from odoo import _
from odoo.addons.graphql_vuestorefront.schemas.objects import PaymentAcquirer
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.http import request
from odoo.osv import expression


class PaymentQuery(graphene.ObjectType):
    payment_acquirer = graphene.Field(
        PaymentAcquirer,
        required=True,
        id=graphene.Int(),
    )
    payment_acquirers = graphene.List(
        graphene.NonNull(PaymentAcquirer),
    )

    def resolve_payment_acquirer(self, info, id):
        domain = [
            ('id', '=', id),
            ('state', 'in', ['enabled', 'test']),
        ]
        payment_acquirer = info.context["env"]['payment.acquirer'].sudo().search(domain, limit=1)
        if not payment_acquirer:
            raise GraphQLError(_('Payment acquirer does not exist.'))
        return payment_acquirer

    def resolve_payment_acquirers(self, info):
        env = info.context["env"]

        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order()

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


class MakePaymentResult(graphene.ObjectType):
    form = generic.GenericScalar()


class MakePayment(graphene.Mutation):
    class Arguments:
        payment_acquire_id = graphene.Int(required=True)

    Output = MakePaymentResult

    @staticmethod
    def mutate(self, info, payment_acquire_id):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website

        return MakePaymentResult(
            form=WebsiteSale().payment_transaction(payment_acquire_id).decode('utf-8')
        )


class PaymentMutation(graphene.ObjectType):
    make_payment = MakePayment.Field(description='Creates a new payment request.')
