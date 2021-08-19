# -*- coding: utf-8 -*-

import graphene
from graphene.types import generic

from odoo.addons.graphql_base import OdooObjectType
from odoo.addons.http_routing.models.ir_http import slug


# --------------------- #
#       ENUMS           #
# --------------------- #

class SortEnum(graphene.Enum):
    ASC = 'ASC'
    DESC = 'DESC'


# --------------------- #
#       Objects         #
# --------------------- #


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

    @staticmethod
    def resolve_id(root, info):
        return root.id or None

    @staticmethod
    def resolve_image(root, info):
        if root.image_1920:
            base_url = info.context["env"]['ir.config_parameter'].sudo().get_param('web.base.url')
            image_url = '{}/web/image/product.image/{}/image_1920'.format(base_url, root.id)
            return image_url
        return None

    @staticmethod
    def resolve_video(root, info):
        return root.video_url or None


class Product(OdooObjectType):
    id = graphene.Int(required=True)
    type_id = graphene.String()
    visibility = graphene.Int()
    status = graphene.Int()
    name = graphene.String()
    sku = graphene.String()
    description = graphene.String()
    price = graphene.Float()
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
    combination_info = generic.GenericScalar()

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
        return self.lst_price

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

    def resolve_combination_info(self, info):
        return self._get_combination_info_variant(pricelist=self.pricelist_id)
