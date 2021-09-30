# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Category
)


def get_search_order(sort):
    sorting = ''
    for field, val in sort.items():
        if sorting:
            sorting += ', '
        sorting += '%s %s' % (field, val)

    # Add id as last factor so we can consistently get the same results
    if sorting:
        sorting += ', id ASC'
    else:
        sorting = 'id ASC'

    return sorting


class CategoryFilterInput(graphene.InputObjectType):
    id = graphene.List(graphene.Int)
    parent = graphene.Boolean()


class CategorySortInput(graphene.InputObjectType):
    id = SortEnum()


class Categories(graphene.Interface):
    categories = graphene.List(Category)
    total_count = graphene.Int(required=True)


class CategoryList(graphene.ObjectType):
    class Meta:
        interfaces = (Categories,)


class CategoryQuery(graphene.ObjectType):
    category = graphene.Field(
        Category,
        required=True,
        id=graphene.Int(),
    )
    categories = graphene.Field(
        Categories,
        filter=graphene.Argument(CategoryFilterInput, default_value={}),
        current_page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=20),
        search=graphene.String(default_value=False),
        sort=graphene.Argument(CategorySortInput, default_value={})
    )

    @staticmethod
    def resolve_category(self, info, id):
        category = info.context['env']['product.public.category'].search([('id', '=', id)], limit=1)
        if not category:
            raise GraphQLError(_('Category does not exist.'))
        return category

    @staticmethod
    def resolve_categories(self, info, filter, current_page, page_size, search, sort):
        env = info.context["env"]
        order = get_search_order(sort)
        domain = []

        if search:
            for srch in search.split(" "):
                domain += [('name', 'ilike', srch)]

        if filter.get('id'):
            domain += [('id', 'in', filter['id'])]

        # Parent if is a Top Category
        if filter.get('parent'):
            domain += [('parent_id', '=', False)]

        # First offset is 0 but first page is 1
        if current_page > 1:
            offset = (current_page - 1) * page_size
        else:
            offset = 0

        ProductPublicCategory = env["product.public.category"]
        total_count = ProductPublicCategory.search_count(domain)
        categories = ProductPublicCategory.search(domain, limit=page_size, offset=offset, order=order)
        return CategoryList(categories=categories, total_count=total_count)
