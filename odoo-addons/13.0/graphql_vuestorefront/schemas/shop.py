# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import fields

from odoo.addons.graphql_vuestorefront.schemas.objects import Order


class Cart(graphene.Interface):
    order = graphene.Field(Order)


class CartData(graphene.ObjectType):
    class Meta:
        interfaces = (Cart,)


class ShoppingCartQuery(graphene.ObjectType):
    cart = graphene.Field(
        Cart,
    )

    @staticmethod
    def resolve_cart(self, info):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=True)
        if order and order.state != 'draft':
            request.session['sale_order_id'] = None
            order = website.sale_get_order(force_create=True)
        if order:
            order.order_line.filtered(lambda l: not l.product_id.active).unlink()
        return CartData(order=order)


class CartAddItem(graphene.Mutation):
    class Arguments:
        product_id = graphene.Int(required=True)
        quantity = graphene.Int(required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, product_id, quantity):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        order._cart_update(product_id=product_id, add_qty=quantity)
        return CartData(order=order)


class CartRemoveItem(graphene.Mutation):
    class Arguments:
        line_id = graphene.Int(required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, line_id):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        line = order.order_line.filtered(lambda rec: rec.id == line_id)
        line.unlink()
        return CartData(order=order)


class CartClear(graphene.Mutation):

    Output = Order

    @staticmethod
    def mutate(self, info):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        order.order_line.sudo().unlink()
        return order


class ShopMutation(graphene.ObjectType):
    cart_add_item = CartAddItem.Field(description="Add Item")
    cart_remove_item = CartRemoveItem.Field(description="Remove Item")
    cart_clear = CartClear.Field(description="Cart Clear")
