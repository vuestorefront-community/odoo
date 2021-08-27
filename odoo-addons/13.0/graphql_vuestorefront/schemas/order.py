# -*- coding: utf-8 -*-
import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Order,
    get_document_with_check_access,
    get_document_count_with_check_access
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


class OrderSortInput(graphene.InputObjectType):
    id = SortEnum()
    date_order = SortEnum()
    name = SortEnum()
    state = SortEnum()


class Orders(graphene.Interface):
    orders = graphene.List(Order)
    total_count = graphene.Int(required=True)


class OrderList(graphene.ObjectType):
    class Meta:
        interfaces = (Orders,)


class OrderQuery(graphene.ObjectType):
    order = graphene.Field(
        Order,
        required=True,
        id=graphene.Int(),
    )
    orders = graphene.Field(
        Orders,
        current_page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=10),
        sort=graphene.Argument(OrderSortInput, default_value={})
    )

    @staticmethod
    def resolve_order(self, info, id):
        SaleOrder = info.context['env']['sale.order']
        error_msg = 'Sale Order does not exist.'
        order = get_document_with_check_access(SaleOrder, [('id', '=', id)], error_msg=error_msg)
        if not order:
            raise GraphQLError(_(error_msg))
        return order

# --------------------------------------------- PROBLEM WITH SORTING ------------------------------------------------ #
    @staticmethod
    def resolve_orders(self, info, current_page, page_size, sort):
        env = info.context["env"]
        user = request.env.user
        partner = user.partner_id
        sort_order = get_search_order(sort)
        domain = [
            ('message_partner_ids', 'child_of', [partner.commercial_partner_id.id]),
            ('state', 'in', ['sale', 'done'])
        ]

        # First offset is 0 but first page is 1
        if current_page > 1:
            offset = (current_page - 1) * page_size
        else:
            offset = 0

        SaleOrder = env["sale.order"]
        orders = get_document_with_check_access(SaleOrder, domain, sort_order, page_size, offset,
                                                error_msg='Sale Order does not exist.')
        total_count = get_document_count_with_check_access(SaleOrder, domain)
        return OrderList(orders=orders, total_count=total_count)
