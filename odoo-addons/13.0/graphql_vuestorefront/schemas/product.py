# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Product, Attribute
)


def get_search_order(sort):
    sorting = ''
    for field, val in sort.items():
        if sorting:
            sorting += ', '
        if field == 'price':
            sorting += 'list_price %s' % val
        else:
            sorting += '%s %s' % (field, val)

    # Add id as last factor so we can consistently get the same results
    if sorting:
        sorting += ', id ASC'
    else:
        sorting = 'id ASC'

    return sorting


def get_search_domain(env, search, **kwargs):
    # Only get published products
    domain = [('website_published', '=', True)]

    # Filter with Category
    if kwargs.get('category_id', False):
        domain += [('public_categ_ids', 'in', kwargs['category_id'])]

    # Filter with Attribute Value
    if kwargs.get('attribute_value_id', False):
        domain += [('attribute_line_ids.value_ids', 'in', kwargs['attribute_value_id'])]

    # Filter With Name
    if kwargs.get('name', False):
        name = kwargs['name']
        for n in name.split(" "):
            domain += [('name', 'ilike', n)]

    if search:
        for srch in search.split(" "):
            domain += ['|', '|', ('name', 'ilike', srch), ('description_sale', 'like', srch),
                       ('default_code', 'like', srch)]

    # Product Price Filter
    if kwargs.get('min_price', False):
        domain += [('list_price', '>=', float(kwargs['min_price']))]
    if kwargs.get('max_price', False):
        domain += [('list_price', '<=', float(kwargs['max_price']))]

    return domain


def get_product_list(env, current_page, page_size, search, sort, **kwargs):
    Product = env['product.template'].sudo()
    ProductAttribute = env['product.attribute'].sudo()
    domain = get_search_domain(env, search, **kwargs)
    # First offset is 0 but first page is 1
    if current_page > 1:
        offset = (current_page - 1) * page_size
    else:
        offset = 0
    order = get_search_order(sort)
    products = Product.search(domain, limit=page_size, offset=offset, order=order)
    total_count = Product.search_count(domain)
    search_products = Product.search(domain, order=order)
    attributes = ProductAttribute.search([('product_tmpl_ids', 'in', search_products.ids)])
    return products, total_count, attributes


class Products(graphene.Interface):
    products = graphene.List(Product)
    total_count = graphene.Int(required=True)
    attributes = graphene.List(Attribute)


class ProductList(graphene.ObjectType):
    class Meta:
        interfaces = (Products,)


class ProductFilterInput(graphene.InputObjectType):
    category_id = graphene.List(graphene.Int)
    attribute_value_id = graphene.List(graphene.Int)
    name = graphene.String()
    min_price = graphene.Float()
    max_price = graphene.Float()


class ProductSortInput(graphene.InputObjectType):
    id = SortEnum()
    name = SortEnum()
    price = SortEnum()


class ProductVariant(graphene.Interface):
    product_id = graphene.Int()
    product_template_id = graphene.Int()
    display_name = graphene.String()
    display_image = graphene.Boolean()
    price = graphene.Float()
    list_price = graphene.String()
    has_discounted_price = graphene.Boolean()
    is_combination_possible = graphene.Boolean()


class ProductVariantData(graphene.ObjectType):
    class Meta:
        interfaces = (ProductVariant,)


class ProductQuery(graphene.ObjectType):
    product = graphene.Field(
        Product,
        required=True,
        id=graphene.Int(),
    )
    products = graphene.Field(
        Products,
        filter=graphene.Argument(ProductFilterInput, default_value={}),
        current_page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=20),
        search=graphene.String(default_value=False),
        sort=graphene.Argument(ProductSortInput, default_value={})
    )
    attribute = graphene.Field(
        Attribute,
        required=True,
        id=graphene.Int(),
    )
    product_variant = graphene.Field(
        ProductVariant,
        required=True,
        product_template_id=graphene.Int(),
        combination_id=graphene.List(graphene.Int)
    )

    @staticmethod
    def resolve_product(self, info, id):
        product = info.context["env"]["product.template"].sudo().search([('id', '=', id)], limit=1)
        if not product:
            raise GraphQLError(_('Product does not exist.'))
        return product

    @staticmethod
    def resolve_products(self, info, filter, current_page, page_size, search, sort):
        env = info.context["env"]
        products, total_count, attributes = get_product_list(env, current_page, page_size, search, sort, **filter)
        return ProductList(products=products, total_count=total_count, attributes=attributes)

    @staticmethod
    def resolve_attribute(self, info, id):
        attribute = info.context["env"]["product.attribute"].search([('id', '=', id)], limit=1)
        if not attribute:
            raise GraphQLError(_('Attribute does not exist.'))
        return attribute

    @staticmethod
    def resolve_product_variant(self, info, product_template_id, combination_id):
        env = info.context["env"]

        website = env['website'].get_current_website()
        request.website = website
        pricelist = website.get_current_pricelist()

        product_template = env['product.template'].browse(product_template_id)
        combination = env['product.template.attribute.value'].browse(combination_id)

        variant_info = product_template._get_combination_info(combination, pricelist)

        product = env['product.product'].browse(variant_info['product_id'])
        is_combination_possible = product_template._is_combination_possible(combination)

        # Condition to Verify if Product is active or if combination exist
        if not product or not product.active or not is_combination_possible:
            variant_info['is_combination_possible'] = False
        else:
            variant_info['is_combination_possible'] = True

        return ProductVariantData(
            product_id=variant_info['product_id'],
            product_template_id=variant_info['product_template_id'],
            display_name=variant_info['display_name'],
            display_image=variant_info['display_image'],
            price=variant_info['price'],
            list_price=variant_info['list_price'],
            has_discounted_price=variant_info['has_discounted_price'],
            is_combination_possible=variant_info['is_combination_possible']
        )
