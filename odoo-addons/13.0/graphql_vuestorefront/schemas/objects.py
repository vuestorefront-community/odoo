# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from graphene.types import generic
from odoo import _

from werkzeug import urls

from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug
from odoo.exceptions import AccessError
from odoo.http import request


# --------------------- #
#       ENUMS           #
# --------------------- #

OrderStage = graphene.Enum('OrderStage', [('Quotation', 'draft'), ('QuotationSent', 'sent'),
                                          ('SalesOrder', 'sale'), ('Locked', 'done'), ('Cancelled', 'cancel')])

InvoiceState = graphene.Enum('InvoiceState', [('Draft', 'draft'), ('Posted', 'posted'), ('Cancelled', 'cancel')])

Provider = graphene.Enum('Provider', [('Ingenico', 'ogone'), ('ManualPayment', 'transfer'),
                                      ('CustomPaymentForm', 'manual')])


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
    return document


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


def product_is_in_wishlist(env, product):
    website = env['website'].get_current_website()
    request.website = website
    return product._is_in_wishlist()


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


class State(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    code = graphene.String(required=True)


class Country(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    code = graphene.String(required=True)
    states = graphene.List(graphene.NonNull(lambda: State))

    def resolve_states(self, info):
        return self.state_ids or None


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


class User(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    email = graphene.String(required=True)
    partner = graphene.Field(lambda: Partner)

    def resolve_email(self, info):
        return self.login or None

    def resolve_partner(self, info):
        return self.partner_id or None


class Currency(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    symbol = graphene.String()


class Category(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    parent = graphene.Field(lambda: Category)
    childs = graphene.List(graphene.NonNull(lambda: Category))
    slug = graphene.String()
    products = graphene.List(graphene.NonNull(lambda: Product))

    def resolve_parent(self, info):
        return self.parent_id or None

    def resolve_childs(self, info):
        return self.child_id or None

    def resolve_slug(self, info):
        return slug(self) or None

    def resolve_products(self, info):
        return self.product_tmpl_ids or None


class AttributeValue(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    display_type = graphene.String()
    html_color = graphene.String()
    search = graphene.String()
    price_extra = graphene.Float(description='Not use in the return Attributes List of the Products Query')
    attribute_id = graphene.Int()
    attribute_name = graphene.String()

    def resolve_id(self, info):
        return self.id or None

    def resolve_search(self, info):
        attribute_id = self.attribute_id.id
        attribute_value_id = self.id
        return '{}-{}'.format(attribute_id, attribute_value_id) or None

    def resolve_attribute_name(self, info):
        return self.attribute_id.name or None


class Attribute(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    display_type = graphene.String()
    values = graphene.List(graphene.NonNull(lambda: AttributeValue))

    def resolve_values(self, info):
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
    currency = graphene.Field(lambda: Currency)
    weight = graphene.Float()
    meta_title = graphene.String()
    meta_keyword = graphene.String()
    meta_description = graphene.String()
    categories = graphene.List(graphene.NonNull(lambda: Category))
    is_in_stock = graphene.Boolean()
    is_in_wishlist = graphene.Boolean()
    media_gallery = graphene.List(graphene.NonNull(lambda: ProductImage))
    qty = graphene.Float()
    slug = graphene.String()
    alternative_products = graphene.List(graphene.NonNull(lambda: Product))
    accessory_products = graphene.List(graphene.NonNull(lambda: Product))
    # Specific to use in Product Variant
    variant_price = graphene.Float(description='Specific to Product Variant')
    variant_price_after_discount = graphene.Float(description='Specific to Product Variant')
    variant_has_discounted_price = graphene.Boolean(description='Specific to Product Variant')
    variant_image = graphene.String(description='Specific to Product Variant')
    variant_small_image = graphene.String(description='Specific to Product Variant')
    variant_thumbnail = graphene.String(description='Specific to Product Variant')
    variant_attribute_values = graphene.List(graphene.NonNull(lambda: AttributeValue),
                                             description='Specific to Product Variant')
    # Specific to use in Product Template
    price = graphene.Float(description='Specific to Product Template')
    image = graphene.String(description='Specific to Product Template')
    small_image = graphene.String(description='Specific to Product Template')
    thumbnail = graphene.String(description='Specific to Product Template')
    attribute_values = graphene.List(graphene.NonNull(lambda: AttributeValue),
                                     description='Specific to Product Template')
    product_variants = graphene.List(graphene.NonNull(lambda: Product), description='Specific to Product Template')
    first_variant = graphene.Int(description='Specific to use in Product Template')

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

    def resolve_currency(self, info):
        return self.currency_id or None

    def resolve_meta_title(self, info):
        return self.website_meta_title or None

    def resolve_meta_keyword(self, info):
        return self.website_meta_keywords or None

    def resolve_meta_description(self, info):
        return self.website_meta_description or None

    def resolve_categories(self, info):
        return self.public_categ_ids or None

    def resolve_is_in_stock(self, info):
        return bool(self.qty_available > 0)

    def resolve_is_in_wishlist(self, info):
        env = info.context["env"]
        is_in_wishlist = product_is_in_wishlist(env, self)
        return bool(is_in_wishlist)

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

    # Specific to use in Product Variant
    def resolve_variant_price(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['list_price'] or None

    def resolve_variant_price_after_discount(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['price'] or None

    def resolve_variant_has_discounted_price(self, info):
        env = info.context["env"]
        pricing_info = get_product_pricing_info(env, self)
        return pricing_info['has_discounted_price']

    def resolve_variant_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_1920'.format(base_url, self.id)
        return None

    def resolve_variant_small_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_128'.format(base_url, self.id)
        return None

    def resolve_variant_thumbnail(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.product/{}/image_512'.format(base_url, self.id)
        return None

    def resolve_variant_attribute_values(self, info):
        return self.product_template_attribute_value_ids or None

    # Specific to use in Product Template
    def resolve_price(self, info):
        return self.list_price or None

    def resolve_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.template/{}/image_1920'.format(base_url, self.id)
        return None

    def resolve_small_image(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.template/{}/image_128'.format(base_url, self.id)
        return None

    def resolve_thumbnail(self, info):
        if self.image_1920:
            env = info.context["env"]
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/product.template/{}/image_512'.format(base_url, self.id)
        return None

    def resolve_attribute_values(self, info):
        return self.attribute_line_ids.product_template_value_ids or None

    def resolve_product_variants(self, info):
        return self.product_variant_ids or None

    def resolve_first_variant(self, info):
        return self.product_variant_id or None


class Payment(OdooObjectType):
    id = graphene.Int()
    name = graphene.String()
    provider = graphene.String()
    amount = graphene.Float()
    payment_reference = graphene.String()

    def resolve_provider(self, info):
        return self.journal_id.name or None


class PaymentTransaction(OdooObjectType):
    id = graphene.Int()
    payment = graphene.Field(lambda: Payment)
    payment_token = graphene.String()
    amount = graphene.Float()
    acquirer = graphene.String()

    def resolve_payment(self, info):
        return self.payment_id or None

    def resolve_payment_token(self, info):
        return self.payment_token_id.name or None

    def resolve_acquirer(self, info):
        return self.acquirer_id.name or None


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


class ShippingMethod(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    price = graphene.Float()

    def resolve_price(self, info):
        return self.fixed_price or None


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
    amount_delivery = graphene.Float()
    currency_rate = graphene.String()
    shipping_method = graphene.Field(lambda: ShippingMethod)
    currency = graphene.Field(lambda: Currency)
    order_lines = graphene.List(graphene.NonNull(lambda: OrderLine))
    stage = OrderStage()
    order_url = graphene.String()
    transactions = graphene.List(graphene.NonNull(lambda: PaymentTransaction))

    def resolve_partner(self, info):
        return self.partner_id or None

    def resolve_partner_shipping(self, info):
        return self.partner_shipping_id or None

    def resolve_partner_invoice(self, info):
        return self.partner_invoice_id or None

    def resolve_date_order(self, info):
        return self.date_order or None

    def resolve_shipping_method(self, info):
        return self.carrier_id or None

    def resolve_currency(self, info):
        return self.currency_id or None

    def resolve_order_lines(self, info):
        return self.order_line or None

    def resolve_stage(self, info):
        return self.state or None

    def resolve_order_url(self, info):
        env = info.context["env"]
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url')
        url = urls.url_join(base_url, self.get_portal_url(report_type='pdf', download=True))
        if url:
            return url
        return None

    def resolve_transactions(self, info):
        return self.transaction_ids or None


class InvoiceLine(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    product = graphene.Field(lambda: Product)
    quantity = graphene.Float()
    price_unit = graphene.Float()
    price_subtotal = graphene.Float()
    price_total = graphene.Float()

    def resolve_product(self, info):
        return self.product_id or None


class Invoice(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    partner = graphene.Field(lambda: Partner)
    partner_shipping = graphene.Field(lambda: Partner)
    invoice_date = graphene.String()
    invoice_date_due = graphene.String()
    amount_untaxed = graphene.Float()
    amount_tax = graphene.Float()
    amount_total = graphene.Float()
    amount_residual = graphene.Float()
    currency = graphene.Field(lambda: Currency)
    invoice_lines = graphene.List(graphene.NonNull(lambda: InvoiceLine))
    state = InvoiceState()
    invoice_url = graphene.String()
    transactions = graphene.List(graphene.NonNull(lambda: PaymentTransaction))

    def resolve_partner(self, info):
        return self.partner_id or None

    def resolve_partner_shipping(self, info):
        return self.partner_shipping_id or None

    def resolve_invoice_date(self, info):
        return self.invoice_date or None

    def resolve_invoice_date_due(self, info):
        return self.invoice_date_due or None

    def resolve_currency(self, info):
        return self.currency_id or None

    def resolve_invoice_lines(self, info):
        return self.invoice_line_ids or None

    def resolve_state(self, info):
        return self.state or None

    def resolve_invoice_url(self, info):
        env = info.context["env"]
        base_url = env['ir.config_parameter'].sudo().get_param('web.base.url')
        url = urls.url_join(base_url, self.get_portal_url(report_type='pdf', download=True))
        if url:
            return url
        return None

    def resolve_transactions(self, info):
        return self.transaction_ids or None


class WishlistItem(OdooObjectType):
    id = graphene.Int(required=True)
    partner = graphene.Field(lambda: Partner)
    product = graphene.Field(lambda: Product)

    def resolve_partner(self, info):
        return self.partner_id or None

    def resolve_product(self, info):
        return self.product_id or None


class PaymentIcon(OdooObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    image = graphene.String()

    def resolve_image(self, info):
        if self.image:
            env = info.context['env']
            base_url = env['ir.config_parameter'].sudo().get_param('web.base.url', '')
            return '{}/web/image/payment.icon/{}/image'.format(base_url, self.id)
        return None


class PaymentAcquirer(OdooObjectType):
    id = graphene.Int(required=True)
    name = graphene.String()
    provider = Provider()
    payment_icons = graphene.List(graphene.NonNull(lambda: PaymentIcon))

    def resolve_payment_icons(self, info):
        return self.payment_icon_ids or None
