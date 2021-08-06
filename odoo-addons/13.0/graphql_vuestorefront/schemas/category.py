# -*- coding: utf-8 -*-

import graphene

from odoo.addons.graphql_vuestorefront.schemas.objects import SortEnum, Category


def get_search_order(sort):
    sorting = ''
    for field, val in sort.items():
        if sorting:
            sorting += ', '
        if field == 'price':
            sorting += 'lst_price %s' % val
        else:
            sorting += '%s %s' % (field, val)
    if not sorting:
        sorting = 'id asc'
    return sorting


class CategoryFilterInput(graphene.InputObjectType):
    id = graphene.List(graphene.Int)
    parent_id = graphene.Int()


class CategorySortInput(graphene.InputObjectType):
    id = SortEnum()
    parent_id = SortEnum()


class Categories(graphene.Interface):
    category = graphene.List(graphene.NonNull(Category))
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
        filter=graphene.Argument(CategoryFilterInput),
        current_page=graphene.Int(default_value=0),
        page_size=graphene.Int(default_value=20),
        search=graphene.String(),
        sort=graphene.Argument(CategorySortInput, )
    )

    @staticmethod
    def resolve_category(self, info, id):
        return info.context["env"]["product.public.category"].search([('id', '=', id)])

    @staticmethod
    def resolve_categories(self, info, current_page, page_size, filter={}, search='', sort={}):
        env = info.context["env"]
        order = get_search_order(sort)
        domain = []
        if search:
            for srch in search.split(" "):
                domain += [('name', 'ilike', srch)]
        if filter.get('id'):
            domain += [('id', 'in', filter['id'])]
        # IMPORTANT ###########################
        # Verify this condition ------------------------------------------------------------
        if filter.get('parent_id'):
            domain += [('parent_id', '=', filter['id'])]

        offset = current_page and current_page * page_size or 0
        ProductPublicCategory = env["product.public.category"]
        total_count = ProductPublicCategory.search_count(domain)
        category = ProductPublicCategory.search(domain, limit=page_size, offset=offset, order=order)
        return CategoryList(category=category, total_count=total_count)
