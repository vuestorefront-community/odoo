# -*- coding: utf-8 -*-
import graphene
from graphql import GraphQLError
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Product, Attribute,
)

# -------------------------------------------------------- REVIEW THIS PART OF CODE ---------------------------------- #
# SORT AND FILTER BY category, attribute, minprice and maxprice not WORKING

def get_search_order(sort):
    sorting = ''
    for field, val in sort.items():
        print(field)
        print(val)
        if sorting:
            sorting += ', '
        if field == 'price':
            sorting += 'lst_price %s' % val
        else:
            sorting += '%s %s' % (field, val)
    if not sorting:
        sorting = 'id asc'
    print(sorting)
    return sorting


def get_search_domain(env, search, **kwargs):
    # Only get published products
    domain = [('website_published', '=', True)]

    # Filter with Category
    if kwargs.get('category_id', False):
        domain += [('public_categ_id', '=', kwargs['category_id'])]

    if search:
        for srch in search.split(" "):
            domain += ['|', '|', ('name', 'ilike', srch), ('description_sale', 'like', srch), ('default_code', 'like', srch)]

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
    product_count = Product.search_count(domain)
    return products, product_count


class Products(graphene.Interface):
    products = graphene.List(Product)
    product_count = graphene.Int(required=True)


class ProductList(graphene.ObjectType):
    class Meta:
        interfaces = (Products,)


class ProductFilterInput(graphene.InputObjectType):
    attributes = graphene.List(graphene.Int)
    min_price = graphene.Float()
    max_price = graphene.Float()
    category_id = graphene.Int()


class ProductSortInput(graphene.InputObjectType):
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
        current_page=graphene.Int(default_value=0),
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
        product = info.context["env"]["product.product"].sudo().search([('id', '=', id)])
        if not product:
            raise GraphQLError(_('Product does not exist.'))
        return product

    @staticmethod
    def resolve_products(self, info, filter, current_page, page_size, search, sort):
        env = info.context["env"]
        products, product_count = get_product_list(env, current_page, page_size, search, sort, **filter)
        return ProductList(products=products, product_count=product_count)

    @staticmethod
    def resolve_attribute(self, info, attribute_id):
        attribute = info.context["env"]["product.attribute"].search([('id', '=', attribute_id)])
        if not attribute:
            raise GraphQLError(_('Attribute does not exist.'))
        return attribute
