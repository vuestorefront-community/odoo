# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

# disable undefined variable error, which erroneously triggers
# on forward declarations of classes in lambdas
# pylint: disable=E0602

import graphene
import requests
from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.http import request
from odoo.osv import expression


class State(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)


class Country(OdooObjectType):
    id = graphene.ID()
    code = graphene.String(required=True)
    name = graphene.String(required=True)
    states = graphene.List(graphene.NonNull(lambda: State))

    @staticmethod
    def resolve_states(root, info):
        return root.state_ids or None


class User(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    login = graphene.String(required=True)


class Partner(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    street = graphene.String()
    street2 = graphene.String()
    city = graphene.String()
    state = graphene.Field(State)
    zip = graphene.String()
    country = graphene.Field(Country)
    email = graphene.String()
    phone = graphene.String()
    is_company = graphene.Boolean(required=True)
    type = graphene.String()
    contacts = graphene.List(graphene.NonNull(lambda: Partner))

    @staticmethod
    def resolve_state(root, info):
        return root.state_id or None

    @staticmethod
    def resolve_country(root, info):
        return root.country_id or None

    @staticmethod
    def resolve_contacts(root, info):
        return root.child_ids or None


class EcommerceCategory(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    parent = graphene.List(graphene.NonNull(lambda: EcommerceCategory))
    slug = graphene.String()

    @staticmethod
    def resolve_parent(root, info):
        return root.parent_id or None

    @staticmethod
    def resolve_slug(root, info):
        return slug(root).replace('-{}'.format(root.id), '')


class ProductAttribute(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)


class Currency(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    symbol = graphene.String(required=True)


class ProductTemplate(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    display_name = graphene.String()
    description = graphene.String()
    image = graphene.String()
    slug = graphene.String()
    default_code = graphene.String()
    list_price = graphene.Float()
    standard_price = graphene.Float()
    currency = graphene.Field(Currency)
    ecommerce_categories = graphene.List(graphene.NonNull(lambda: EcommerceCategory))
    attributes = graphene.List(graphene.NonNull(lambda: ProductAttribute))
    first_variant_id = graphene.Int()

    @staticmethod
    def resolve_description(root, info):
        return root.description_sale or None

    @staticmethod
    def resolve_image(root, info):
        env = info.context['env']
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
        return '{}/web/image/product.template/{}/image_1920'.format(base_url, root.id)

    @staticmethod
    def resolve_slug(root, info):
        return slug(root).replace('-{}'.format(root.id), '')

    @staticmethod
    def resolve_currency(root, info):
        return root.currency_id or None

    @staticmethod
    def resolve_attributes(root, info):
        return root.valid_product_template_attribute_line_ids or None

    @staticmethod
    def resolve_ecommerce_categories(root, info):
        return root.public_categ_ids or None

    @staticmethod
    def resolve_first_variant_id(root, info):
        return root.product_variant_id.id or None


class Product(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    description = graphene.String()
    image = graphene.String()
    slug = graphene.String()
    default_code = graphene.String()
    list_price = graphene.Float()
    standard_price = graphene.Float()
    currency = graphene.Field(Currency)
    product_template = graphene.Field(ProductTemplate)
    ecommerce_categories = graphene.List(graphene.NonNull(lambda: EcommerceCategory))
    attributes = graphene.List(graphene.NonNull(lambda: ProductAttribute))

    @staticmethod
    def resolve_name(root, info):
        return root.display_name

    @staticmethod
    def resolve_description(root, info):
        return root.description_sale or None

    @staticmethod
    def resolve_image(root, info):
        env = info.context['env']
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
        return '{}/web/image/product.product/{}/image_1920'.format(base_url, root.id)

    @staticmethod
    def resolve_slug(root, info):
        return slug(root).replace('-{}'.format(root.id), '')

    @staticmethod
    def resolve_currency(root, info):
        return root.currency_id or None

    @staticmethod
    def resolve_product_template(root, info):
        return root.product_template_id or None

    @staticmethod
    def resolve_attributes(root, info):
        return root.product_template_attribute_value_ids or None

    @staticmethod
    def resolve_ecommerce_categories(root, info):
        return root.public_categ_ids or None

    @staticmethod
    def resolve_first_variant_id(root, info):
        return root.product_variant_id.id or None


class WishlistItem(OdooObjectType):
    id = graphene.ID()
    partner = graphene.Field(Partner)
    product = graphene.Field(Product)
    currency = graphene.Field(Currency)
    price = graphene.Float()

    @staticmethod
    def resolve_partner(root, info):
        return root.partner_id or None

    @staticmethod
    def resolve_product(root, info):
        return root.product_id or None

    @staticmethod
    def resolve_currency(root, info):
        return root.currency_id or None


class ShippingMethod(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()


class SaleOrderLine(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    product = graphene.Field(Product)
    product_uom_qty = graphene.Float()
    price_total = graphene.Float()

    @staticmethod
    def resolve_product(root, info):
        return root.product_id or None


class SaleOrder(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    date_order = graphene.DateTime()
    partner = graphene.Field(Partner)
    partner_invoice = graphene.Field(Partner)
    partner_shipping = graphene.Field(Partner)
    currency = graphene.Field(Currency)
    website_order_line = graphene.List(graphene.NonNull(lambda: SaleOrderLine))
    order_line = graphene.List(graphene.NonNull(lambda: SaleOrderLine))
    invoice_status = graphene.String()
    amount_untaxed = graphene.Float()
    amount_tax = graphene.Float()
    amount_delivery = graphene.Float()
    amount_total = graphene.Float()
    currency_rate = graphene.String()
    shipping_method = graphene.Field(ShippingMethod)

    @staticmethod
    def resolve_partner(root, info):
        return root.partner_id or None

    @staticmethod
    def resolve_partner_invoice(root, info):
        return root.partner_invoice_id or None

    @staticmethod
    def resolve_partner_shipping(root, info):
        return root.partner_shipping_id or None

    @staticmethod
    def resolve_currency(root, info):
        return root.currency_id or None

    @staticmethod
    def resolve_website_order_line(root, info):
        return root.website_order_line or None

    @staticmethod
    def resolve_order_line(root, info):
        return root.order_line or None

    @staticmethod
    def resolve_shipping_method(root, info):
        return root.carrier_id or None


class PaymentIcon(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    image = graphene.String()

    @staticmethod
    def resolve_image(root, info):
        env = info.context['env']
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
        return '{}/web/image/payment.icon/{}/image'.format(base_url, root.id)


class PaymentAcquirer(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    payment_icons = graphene.List(graphene.NonNull(lambda: PaymentIcon))

    @staticmethod
    def resolve_name(root, info):
        return root.display_as or root.name or None

    @staticmethod
    def resolve_payment_icons(root, info):
        return root.payment_icon_ids or None


class Query(graphene.ObjectType):
    all_ecommerce_categories = graphene.List(
        graphene.NonNull(EcommerceCategory),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        top_category=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_product_templates = graphene.List(
        graphene.NonNull(ProductTemplate),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    user_shopping_cart = graphene.List(
        graphene.NonNull(SaleOrder),
        required=True,
    )

    all_wishlist_items = graphene.List(
        graphene.NonNull(WishlistItem),
        required=True
    )

    all_countries = graphene.List(
        graphene.NonNull(Country),
        required=True,
        country_id=graphene.ID(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_delivery_methods = graphene.List(
        graphene.NonNull(ShippingMethod),
        required=True
    )

    all_payment_acquirers = graphene.List(
        graphene.NonNull(PaymentAcquirer),
        required=True
    )

    @staticmethod
    def resolve_all_ecommerce_categories(root, info, id=None, name=None, top_category=False, limit=None, offset=None):
        """
        Get all ecommerce categories, use top_category to get categories without parent which is useful to list
        categories on the navigation header
        """
        env = info.context['env']

        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', 'ilike', name))
        if top_category:
            domain.append(('parent_id', '=', False))

        return env['product.public.category'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_all_product_templates(root, info, id=None, name=None, limit=None, offset=None):
        """ Get all product templates published on the website """
        env = info.context['env']

        domain = [('website_published', '=', True)]
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', 'ilike', name))

        return env['product.template'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_user_shopping_cart(root, info):
        """ Get current user shopping cart """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        return order or env['sale.order']

    @staticmethod
    def resolve_all_wishlist_items(root, info):
        """ Get current user wishlist items """
        env = info.context['env']

        request.website = env.ref('website.default_website')

        return env['product.wishlist'].with_context(display_default_code=False).current()

    @staticmethod
    def resolve_all_countries(root, info, country_id=False, limit=None, offset=None):
        """ Get all countries """
        env = info.context['env']

        domain = []
        if country_id:
            domain.append(('id', '=', country_id))

        return env['res.country'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_all_delivery_methods(root, info):
        """ Get all delivery methods """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        return order._get_delivery_methods()

    @staticmethod
    def resolve_all_payment_acquirers(root, info):
        """ Get all payment acquirers """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        domain = expression.AND([
            ['&', ('state', 'in', ['enabled']), ('company_id', '=', order.company_id.id)],
            ['|', ('website_id', '=', False), ('website_id', '=', request.website.id)],
            ['|', ('country_ids', '=', False), ('country_ids', 'in', [order.partner_id.country_id.id])]
        ])

        return env['payment.acquirer'].sudo().search(domain)


class SignUpUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, name, email, password):
        """ Sign up user with name, email and password """
        env = info.context['env']

        env['res.users'].sudo().signup({
            'name': name,
            'login': email,
            'password': password,
        })

        return True


class SendResetPassword(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, email):
        """ Send reset password to email """
        env = info.context['env']

        env['res.users'].sudo().reset_password(email)

        return True


class ResetPassword(graphene.Mutation):
    class Arguments:
        token = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, token, password):
        """ Reset password using token sent by email """
        env = info.context['env']

        # signup with a token: find the corresponding partner id
        partner = env['res.partner']._signup_retrieve_partner(token, check_validity=True, raise_exception=True)
        # invalidate signup token
        partner.write({'signup_token': False, 'signup_type': False, 'signup_expiration': False})

        partner_user = partner.user_ids and partner.user_ids[0] or False

        if partner_user:
            partner_user.write({'password': password})

        return True


class AddShippingAddress(graphene.Mutation):
    class Arguments:
        delivery_method_id = graphene.ID(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        street = graphene.String(required=True)
        house_number = graphene.String(required=True)
        city = graphene.String(required=True)
        state_id = graphene.Int()
        country_id = graphene.Int(required=True)
        zip_code = graphene.String(required=True)
        phone = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, first_name, last_name, street, city, country_id, zip_code, phone, house_number,
               delivery_method_id, state_id=False):
        """ Add shipping address on checkout """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        values = {
            'name': '%s %s' % (first_name, last_name),
            'street': '%s, %s' % (street, house_number),
            'city': city,
            'state_id': state_id,
            'country_id': country_id,
            'zip': zip_code,
            'phone': phone
        }

        # Get contact from sale order
        partner_id = order.partner_id.id

        # check if is public user
        if partner_id == request.website.user_id.sudo().partner_id.id:
            # create main contact
            values['type'] = 'contact'
            partner_id = env['res.partner'].sudo().with_context(tracking_disable=True).create(values).id
            order.partner_id = partner_id
            order.with_context(not_self_saleperson=True).onchange_partner_id()

        values['type'] = 'delivery'
        values['parent_id'] = partner_id

        # update order with the new shipping id
        order.partner_shipping_id = env['res.partner'].sudo().with_context(tracking_disable=True).create(values).id

        # update order with the delivery line
        order._check_carrier_quotation(force_carrier_id=delivery_method_id)

        return True


class SelectShippingAddress(graphene.Mutation):
    class Arguments:
        shipping_id = graphene.ID(required=True)
        delivery_method_id = graphene.ID(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, shipping_id, delivery_method_id):
        """ Select shipping address on checkout """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        # update order with the new shipping id
        order.partner_shipping_id = shipping_id

        # update order with the delivery line
        order._check_carrier_quotation(force_carrier_id=delivery_method_id)

        return True


class AddBillingAddress(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        street = graphene.String(required=True)
        house_number = graphene.String(required=True)
        city = graphene.String(required=True)
        state_id = graphene.Int()
        country_id = graphene.Int(required=True)
        zip_code = graphene.String(required=True)
        phone = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, first_name, last_name, street, city, country_id, zip_code, phone, house_number,
               state_id=False):
        """ Add billing address on checkout """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        # Get contact from sale order
        partner_id = order.partner_id.id

        values = {
            'name': '%s %s' % (first_name, last_name),
            'street': '%s, %s' % (street, house_number),
            'city': city,
            'state_id': state_id,
            'country_id': country_id,
            'zip': zip_code,
            'phone': phone,
            'type': 'invoice',
            'parent_id': partner_id
        }

        # update order with the new bill id
        order.partner_invoice_id = env['res.partner'].sudo().with_context(tracking_disable=True).create(values).id

        return True


class UseShippingAsBillingAddress(graphene.Mutation):
    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info):
        """ Use shipping as billing address on checkout """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        # Get contact from sale order
        partner_id = order.partner_id.id

        # Get shipping address from sale order
        shipping_partner = order.partner_shipping_id

        values = {
            'name': shipping_partner.name,
            'street': shipping_partner.street,
            'city': shipping_partner.city,
            'state_id': shipping_partner.state_id.id,
            'country_id': shipping_partner.country_id.id,
            'zip': shipping_partner.zip,
            'phone': shipping_partner.phone,
            'type': 'invoice',
            'parent_id': partner_id
        }

        # update order with the new bill id
        order.partner_invoice_id = env['res.partner'].sudo().with_context(tracking_disable=True).create(values).id

        return True


class SelectBillingAddress(graphene.Mutation):
    class Arguments:
        billing_id = graphene.ID()
        use_shipping_data = graphene.Boolean()

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, billing_id):
        """ Select billing address """
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        # update order with the new bill id
        order.partner_invoice_id = billing_id

        return True


class Mutation(graphene.ObjectType):
    sign_up_user = SignUpUser.Field(description='Sign up user with name, email and password')
    send_reset_password = SendResetPassword.Field(description='Send reset password to email')
    reset_password = ResetPassword.Field(description='Reset password using token sent by email')
    select_shipping_address = SelectShippingAddress.Field(description='Select shipping address on checkout')
    add_shipping_address = AddShippingAddress.Field(description='Add shipping address on checkout')
    add_billing_address = AddBillingAddress.Field(description='Add billing address on checkout')
    use_shipping_as_billing_address = UseShippingAsBillingAddress.Field(
        description='Use shipping as billing address on checkout')
    select_billing_address = SelectBillingAddress.Field(description='Select billing address on checkout')


schema = graphene.Schema(query=Query, mutation=Mutation)
