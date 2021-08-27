# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from graphene.types import generic
from odoo import _

from werkzeug import urls

from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug
from odoo.exceptions import AccessError


# --------------------- #
#       ENUMS           #
# --------------------- #

OrderStage = graphene.Enum('OrderStage', [('Quotation', 'draft'), ('QuotationSent', 'sent'),
                                          ('SalesOrder', 'sale'), ('Locked', 'done'), ('Cancelled', 'cancel')])


class SortEnum(graphene.Enum):
    ASC = 'ASC'
    DESC = 'DESC'


# --------------------- #
#      Functions        #
# --------------------- #

def get_document_with_check_access(model, domain, order=None, limit=20, offset=0,
                                   error_msg='This document does not exist.'):
    try:
        model.check_access_rights('read')
        model.check_access_rule('read')
    except AccessError:
        return []
    document = model.search(domain, order=order, limit=limit, offset=offset)
    document_sudo = document.sudo().exists()
    if document and not document_sudo:
        raise GraphQLError(_(error_msg))
    return document_sudo


def get_document_count_with_check_access(model, domain):
    try:
        model.check_access_rights('read')
        model.check_access_rule('read')
    except AccessError:
        return 0
    return model.search_count(domain)


def get_product_pricing_info(env, product):
    website = env['website'].get_current_website()
    pricelist = website.get_current_pricelist()
    return product._get_combination_info_variant(pricelist=pricelist)


# --------------------- #
#       Objects         #
# --------------------- #

class Lead(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    email = graphene.String()
    phone = graphene.Int()
    company = graphene.String()
    subject = graphene.String()
    message = graphene.String()

    def resolve_name(self, info):
        return self.contact_name

    def resolve_email(self, info):
        return self.email_from

    def resolve_company(self, info):
        return self.partner_name

    def resolve_subject(self, info):
        return self.name

    def resolve_message(self, info):
        return self.description


class Country(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    code = graphene.String(required=True)


class State(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    code = graphene.String(required=True)


class Partner(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    street = graphene.String()
    street2 = graphene.String()
    city = graphene.String()
    country = graphene.Field(lambda: Country)
    state = graphene.Field(lambda: State)
    zip = graphene.String()
    email = graphene.String()
    phone = graphene.String()
    is_company = graphene.Boolean(required=True)
    contacts = graphene.List(graphene.NonNull(lambda: Partner))
    signup_token = graphene.String()
    signup_valid = graphene.String()

    def resolve_country(self, info):
        return self.country_id or None

    def resolve_state(self, info):
        return self.state_id or None

    def resolve_contacts(self, info):
        return self.child_ids or None


class Currency(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    symbol = graphene.String()


class Category(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    parent_id = graphene.Field(lambda: Category)
    slug = graphene.String()
    products = graphene.List(graphene.NonNull(lambda: Product))

    def resolve_parent_id(self, info):
        return self.parent_id or None

    def resolve_slug(self, info):
        return slug(self) or None

    def resolve_products(self, info):
        return self.product_tmpl_ids or None


class AttributeValue(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    attribute_code = graphene.String()

    def resolve_attribute_code(self, info):
        return self.attribute_id.name or None


class Attribute(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    options = graphene.List(graphene.NonNull(lambda: AttributeValue))

    def resolve_options(self, info):
        return self.value_ids or None


class ProductImage(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    image = graphene.String()
    video = graphene.String()

    def resolve_id(self, info):
        return self.id or None

    def resolve_image(self, info):
        if self.image_1920:
            base_url = info.context["env"]['ir.config_parameter'].sudo().get_param('web.base.url')
            image_url = '{}/web/image/product.image/{}/image_1920'.format(base_url, self.id)
            return image_url
        return None

    def resolve_video(self, info):
        return self.video_url or None


class Product(OdooObjectType):
    id = graphene.Int(required=True)
    type_id = graphene.String()
    visibility = graphene.Int()
    status = graphene.Int()
    name = graphene.String()
    sku = graphene.String()
    description = graphene.String()
    price = graphene.Float()
    price_after_discount = graphene.Float()
    has_discounted_price = graphene.Boolean()
    currency = graphene.Field(lambda: Currency)
    weight = graphene.Float()
    meta_title = graphene.String()
    meta_keyword = graphene.String()
    meta_description = graphene.String()
    image = graphene.String()
    small_image = graphene.String()
    thumbnail = graphene.String()
    categories = graphene.List(graphene.NonNull(lambda: Category))
    is_in_stock = graphene.Boolean()
    media_gallery = graphene.List(graphene.NonNull(lambda: ProductImage))
    qty = graphene.Float()
    slug = graphene.String()
    alternative_products = graphene.List(graphene.NonNull(lambda: Product))
    accessory_products = graphene.List(graphene.NonNull(lambda: Product))
    product_template_attribute_values = graphene.List(graphene.NonNull(lambda: AttributeValue))

    def resolve_type_id(self, info):
        if self.type == 'product':
            return 'simple'
        else:
            return 'configurable'

    def resolve_visibility(self, info):
        if self.website_published:
            return 1
        else:
            return 0

    def resolve_status(self, info):
        if self.qty_available > 0:
            return 1
        else:
            return 0

    def resolve_sku(self, info):
        return self.default_code or None

    def resolve_description(self, info):
        return self.description_sale or None

    def resolve_price(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['list_price'] or None

    def resolve_price_after_discount(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['price'] or None

    def resolve_has_discounted_price(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['has_discounted_price']

    def resolve_currency(self, info):
        return self.currency_id or None

    def resolve_meta_title(self, info):
        return self.website_meta_title or None

    def resolve_meta_keyword(self, info):
        return self.website_meta_keywords or None

    def resolve_meta_description(self, info):
        return self.website_meta_description or None

    def resolve_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_1920'.format(base_url, self.id)
        return None

    def resolve_small_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_128'.format(base_url, self.id)
        return None

    def resolve_thumbnail(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_512'.format(base_url, self.id)
        return None

    def resolve_categories(self, info):
        return self.public_categ_ids or None

    def resolve_is_in_stock(self, info):
        return bool(self.qty_available > 0)

    def resolve_media_gallery(self, info):
        return self.product_template_image_ids or None

    def resolve_qty(self, info):
        return self.qty_available

    def resolve_slug(self, info):
        return slug(self) or None

    def resolve_alternative_products(self, info):
        return self.alternative_product_ids or None

    def resolve_accessory_products(self, info):
        return self.accessory_product_ids or None

    def resolve_product_template_attribute_values(self, info):
        return self.product_template_attribute_value_ids or None


class OrderLine(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    product = graphene.Field(lambda: Product)
    quantity = graphene.Float()
    price_unit = graphene.Float()
    price_subtotal = graphene.Float()
    price_total = graphene.Float()
    price_tax = graphene.Float()

    def resolve_product(self, info):
        return self.product_id or None

    def resolve_quantity(self, info):
        return self.product_uom_qty or None


class Order(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    partner = graphene.Field(lambda: Partner)
    partner_shipping = graphene.Field(lambda: Partner)
    partner_invoice = graphene.Field(lambda: Partner)
    date_order = graphene.String()
    amount_untaxed = graphene.Float()
    amount_tax = graphene.Float()
    amount_total = graphene.Float()
    currency = graphene.Field(lambda: Currency)
    order_line = graphene.List(graphene.NonNull(lambda: OrderLine))
    stage = OrderStage()
    order_url = graphene.String()

    def resolve_partner(self, info):
        return self.partner_id or None

    def resolve_partner_shipping(self, info):
        return self.partner_shipping_id or None

    def resolve_partner_invoice(self, info):
        return self.partner_invoice_id or None

    def resolve_currency(self, info):
        return self.currency_id or None

    def resolve_order_line(self, info):
        return self.order_line or None

    def resolve_stage(self, info):
        return self.state or None

    def resolve_date_order(self, info):
        return self.date_order or None

    def resolve_order_url(self, info):
        env = info.context["env"]
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url')
        url = urls.url_join(base_url, self.get_portal_url(report_type='pdf', download=True))
        if url:
            return url
        return None
