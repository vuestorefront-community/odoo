# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
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
            sorting += 'lst_price %s' % val
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
    if kwargs.get('category', False):
        domain += [('public_categ_ids', 'in', kwargs['category'])]

    # Filter with Attributes
    if kwargs.get('attribute', False):
        domain += [('product_template_attribute_value_ids', 'in', kwargs['attribute'])]

    if search:
        for srch in search.split(" "):
            domain += ['|', '|', ('name', 'ilike', srch), ('description_sale', 'like', srch),
                       ('default_code', 'like', srch)]

    # Product Price Filter
    if kwargs.get('min_price') and not kwargs.get('max_price'):
        domain += [('lst_price', '>=', float(kwargs['min_price']))]
    elif not kwargs.get('min_price') and kwargs.get('max_price'):
        domain += [('lst_price', '<=', float(kwargs['max_price']))]
    elif kwargs.get('min_price') and kwargs.get('max_price'):
        domain += [
            ('lst_price', '>=', float(kwargs['min_price'])),
            ('lst_price', '<=', float(kwargs['max_price']))
        ]
    return domain


def get_product_list(env, current_page, page_size, search, sort, **kwargs):
    Product = env['product.product'].sudo()
    domain = get_search_domain(env, search, **kwargs)
    # First offset is 0 but first page is 1
    if current_page > 1:
        offset = (current_page - 1) * page_size
    else:
        offset = 0
    order = get_search_order(sort)
    products = Product.search(domain, limit=page_size, offset=offset, order=order)
    total_count = Product.search_count(domain)
    return products, total_count


class Products(graphene.Interface):
    products = graphene.List(Product)
    total_count = graphene.Int(required=True)


class ProductList(graphene.ObjectType):
    class Meta:
        interfaces = (Products,)


class ProductFilterInput(graphene.InputObjectType):
    category = graphene.List(graphene.Int)
    attribute = graphene.List(graphene.Int)
    min_price = graphene.Float()
    max_price = graphene.Float()


class ProductSortInput(graphene.InputObjectType):
    id = SortEnum()
    price = SortEnum()


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
        search=graphene.String(default_value=''),
        sort=graphene.Argument(ProductSortInput, default_value={})
    )
    attribute = graphene.Field(
        Attribute,
        required=True,
        attribute_id=graphene.Int(),
    )

    @staticmethod
    def resolve_product(self, info, id):
        product = info.context["env"]["product.product"].sudo().search([('id', '=', id)], limit=1)
        if not product:
            raise GraphQLError(_('Product does not exist.'))
        return product

    @staticmethod
    def resolve_products(self, info, filter, current_page, page_size, search, sort):
        env = info.context["env"]
        products, total_count = get_product_list(env, current_page, page_size, search, sort, **filter)
        return ProductList(products=products, total_count=total_count)

    @staticmethod
    def resolve_attribute(self, info, attribute_id):
        attribute = info.context["env"]["product.attribute"].search([('id', '=', attribute_id)], limit=1)
        if not attribute:
            raise GraphQLError(_('Attribute does not exist.'))
        return attribute
