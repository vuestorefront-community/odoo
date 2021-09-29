# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import _

from odoo.addons.graphql_vuestorefront.schemas.objects import (
    SortEnum, Invoice,
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


class InvoiceSortInput(graphene.InputObjectType):
    id = SortEnum()
    invoice_date = SortEnum()
    name = SortEnum()
    state = SortEnum()


class Invoices(graphene.Interface):
    invoices = graphene.List(Invoice)
    total_count = graphene.Int(required=True)


class InvoiceList(graphene.ObjectType):
    class Meta:
        interfaces = (Invoices,)


class InvoiceQuery(graphene.ObjectType):
    invoice = graphene.Field(
        Invoice,
        required=True,
        id=graphene.Int(),
    )
    invoices = graphene.Field(
        Invoices,
        current_page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=10),
        sort=graphene.Argument(InvoiceSortInput, default_value={})
    )

    @staticmethod
    def resolve_invoice(self, info, id):
        AccountMove = info.context["env"]['account.move']
        error_msg = 'Invoice does not exist.'
        invoice = get_document_with_check_access(AccountMove, [('id', '=', id)], error_msg=error_msg)
        if not invoice:
            raise GraphQLError(_(error_msg))
        return invoice

    @staticmethod
    def resolve_invoices(self, info, current_page, page_size, sort):
        env = info.context["env"]
        user = request.env.user
        partner = user.partner_id
        sort_order = get_search_order(sort)
        domain = [
            ('message_partner_ids', 'child_of', [partner.commercial_partner_id.id])
        ]

        # First offset is 0 but first page is 1
        if current_page > 1:
            offset = (current_page - 1) * page_size
        else:
            offset = 0

        AccountMove = env["account.move"]
        invoices = get_document_with_check_access(AccountMove, domain, sort_order, page_size, offset,
                                                  error_msg='Invoice does not exist.')
        total_count = get_document_count_with_check_access(AccountMove, domain)
        return InvoiceList(invoices=invoices, total_count=total_count)
