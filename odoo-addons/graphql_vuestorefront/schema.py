# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

# disable undefined variable error, which erroneously triggers
# on forward declarations of classes in lambdas
# pylint: disable=E0602

import graphene
from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.http import request
import requests


class State(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)


class Country(OdooObjectType):
    id = graphene.ID()
    code = graphene.String(required=True)
    name = graphene.String(required=True)


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
    contacts = graphene.List(graphene.NonNull(lambda: Partner))

    @staticmethod
    def resolve_state(root, info):
        return root.state_id or None

    @staticmethod
    def resolve_country(root, info):
        return root.country_id or None

    @staticmethod
    def resolve_contacts(root, info):
        return root.child_ids


class Category(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)


class EcommerceCategory(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    slug = graphene.String()

    @staticmethod
    def resolve_slug(root, info):
        return slug(root).replace('-{}'.format(root.id), '')


class ProductAttribute(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()


class Currency(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    symbol = graphene.String()


class Product(OdooObjectType):
    id = graphene.ID()
    name = graphene.String()
    description = graphene.String()
    categ = graphene.Field(Category)
    image = graphene.String()
    slug = graphene.String()
    default_code = graphene.String()
    list_price = graphene.Float()
    standard_price = graphene.Float()
    currency = graphene.Field(Currency)
    ecommerce_categories = graphene.List(graphene.NonNull(lambda: EcommerceCategory))
    attributes = graphene.List(graphene.NonNull(lambda: ProductAttribute))

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
    def resolve_attributes(root, info):
        return root.product_template_attribute_value_ids or None

    @staticmethod
    def resolve_ecommerce_categories(root, info):
        return root.public_categ_ids or None


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
    state = graphene.String()
    date_order = graphene.DateTime()
    partner_id = graphene.Field(Partner)
    partner_invoice_id = graphene.Field(Partner)
    partner_shipping_id = graphene.Field(Partner)
    currency_id = graphene.Field(Currency)
    order_line = graphene.List(graphene.NonNull(lambda: SaleOrderLine))
    invoice_status = graphene.String()
    amount_untaxed = graphene.Float()
    amount_tax = graphene.Float()
    amount_total = graphene.Float()
    currency_rate = graphene.String()

    @staticmethod
    def resolve_order_line(root, info):
        return root.order_line or None


class Query(graphene.ObjectType):
    all_ecommerce_categories = graphene.List(
        graphene.NonNull(EcommerceCategory),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        parents_only=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_products_template = graphene.List(
        graphene.NonNull(Product),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        website_published=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    all_products = graphene.List(
        graphene.NonNull(Product),
        required=True,
        id=graphene.ID(),
        name=graphene.String(),
        website_published=graphene.Boolean(),
        limit=graphene.Int(),
        offset=graphene.Int(),
    )

    partner_shopping_cart = graphene.List(
        graphene.NonNull(SaleOrder),
        required=True,
    )

    @staticmethod
    def resolve_all_ecommerce_categories(root, info, id=None, name=False, parents_only=False, limit=None, offset=None):
        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', '=', name))
        if parents_only:
            domain.append(('parent_id', '=', False))
        return info.context['env']['product.public.category'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_all_products_template(root, info, id=None, name=False, website_published=False, limit=None,
                                      offset=None):
        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', 'ilike', name))
        if website_published:
            domain.append(('website_published', '=', True))
        return info.context['env']['product.template'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_all_products(root, info, id=None, name=False, website_published=False, limit=None, offset=None):
        domain = []
        if id:
            domain.append(('id', '=', id))
        if name:
            domain.append(('name', 'ilike', name))
        if website_published:
            domain.append(('website_published', '=', True))
        return info.context['env']['product.product'].sudo().search(domain, limit=limit, offset=offset)

    @staticmethod
    def resolve_partner_shopping_cart(root, info):
        env = info.context['env']

        request.website = env.ref('website.default_website')
        order = request.website.sale_get_order()

        return order or env['sale.order']


class SignUpUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(self, info, name, email, password):
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
        env = info.context['env']

        # signup with a token: find the corresponding partner id
        partner = env['res.partner']._signup_retrieve_partner(token, check_validity=True, raise_exception=True)
        # invalidate signup token
        partner.write({'signup_token': False, 'signup_type': False, 'signup_expiration': False})

        partner_user = partner.user_ids and partner.user_ids[0] or False

        if partner_user:
            partner_user.write({'password': password})

        return True


class Mutation(graphene.ObjectType):
    sign_up_user = SignUpUser.Field(description='Documentation of SignUpUser')
    send_reset_password = SendResetPassword.Field(description='Documentation of SendResetPassword')
    reset_password = ResetPassword.Field(description='Documentation of ResetPassword')


schema = graphene.Schema(query=Query, mutation=Mutation)
