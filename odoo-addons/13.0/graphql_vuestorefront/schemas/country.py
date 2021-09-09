# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Country
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


class CountryFilterInput(graphene.InputObjectType):
    id = graphene.List(graphene.Int)


class CountrySortInput(graphene.InputObjectType):
    id = SortEnum()


class Countries(graphene.Interface):
    countries = graphene.List(Country)
    total_count = graphene.Int(required=True)


class CountryList(graphene.ObjectType):
    class Meta:
        interfaces = (Countries,)


class CountryQuery(graphene.ObjectType):
    country = graphene.Field(
        Country,
        required=True,
        id=graphene.Int(),
    )
    countries = graphene.Field(
        Countries,
        filter=graphene.Argument(CountryFilterInput, default_value={}),
        current_page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=20),
        search=graphene.String(default_value=False),
        sort=graphene.Argument(CountrySortInput, default_value={})
    )

    @staticmethod
    def resolve_country(self, info, id):
        country = info.context['env']['res.country'].search([('id', '=', id)], limit=1)
        if not country:
            raise GraphQLError(_('Country does not exist.'))
        return country

    @staticmethod
    def resolve_countries(self, info, filter, current_page, page_size, search, sort):
        env = info.context["env"]
        order = get_search_order(sort)
        domain = []

        if search:
            for srch in search.split(" "):
                domain += [('name', 'ilike', srch)]

        if filter.get('id'):
            domain += [('id', 'in', filter['id'])]

        # First offset is 0 but first page is 1
        if current_page > 1:
            offset = (current_page - 1) * page_size
        else:
            offset = 0

        Country = env["res.country"]
        total_count = Country.search_count(domain)
        countries = Country.search(domain, limit=page_size, offset=offset, order=order)
        return CountryList(countries=countries, total_count=total_count)
