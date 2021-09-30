# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import graphene
from odoo.addons.graphql_vuestorefront.schemas.objects import Order
from odoo.http import request


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
        # Forcing the website_id to be passed to the Order
        order.write({'website_id': website.id})
        order._cart_update(product_id=product_id, add_qty=quantity)
        return CartData(order=order)


class CartUpdateItem(graphene.Mutation):
    class Arguments:
        line_id = graphene.Int(required=True)
        quantity = graphene.Int(required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, line_id, quantity):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        line = order.order_line.filtered(lambda rec: rec.id == line_id)
        # Reset Warning Stock Message always before a new update
        line.warning_stock = ""
        order._cart_update(product_id=line.product_id.id, set_qty=quantity)
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


# ---------------------------------------------------#
#      Additional Mutations that can be useful       #
# ---------------------------------------------------#

class ProductInput(graphene.InputObjectType):
    id = graphene.Int(required=True)
    quantity = graphene.Int(required=True)


class CartLineInput(graphene.InputObjectType):
    id = graphene.Int(required=True)
    quantity = graphene.Int(required=True)


class CartAddMultipleItems(graphene.Mutation):
    class Arguments:
        products = graphene.List(ProductInput, default_value={}, required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, products):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        # Forcing the website_id to be passed to the Order
        order.write({'website_id': website.id})
        for product in products:
            product_id = product['id']
            quantity = product['quantity']
            order._cart_update(product_id=product_id, add_qty=quantity)
        return CartData(order=order)


class CartUpdateMultipleItems(graphene.Mutation):
    class Arguments:
        lines = graphene.List(CartLineInput, default_value={}, required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, lines):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        for line in lines:
            line_id = line['id']
            quantity = line['quantity']
            line = order.order_line.filtered(lambda rec: rec.id == line_id)
            # Reset Warning Stock Message always before a new update
            line.warning_stock = ""
            order._cart_update(product_id=line.product_id.id, set_qty=quantity)
        return CartData(order=order)


class CartRemoveMultipleItems(graphene.Mutation):
    class Arguments:
        line_ids = graphene.List(graphene.Int, required=True)

    Output = CartData

    @staticmethod
    def mutate(self, info, line_ids):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website
        order = website.sale_get_order(force_create=1)
        for line_id in line_ids:
            line = order.order_line.filtered(lambda rec: rec.id == line_id)
            line.unlink()
        return CartData(order=order)


class ShopMutation(graphene.ObjectType):
    cart_add_item = CartAddItem.Field(description="Add Item")
    cart_update_item = CartUpdateItem.Field(description="Update Item")
    cart_remove_item = CartRemoveItem.Field(description="Remove Item")
    cart_clear = CartClear.Field(description="Cart Clear")
    cart_add_multiple_items = CartAddMultipleItems.Field(description="Add Multiple Items")
    cart_update_multiple_items = CartUpdateMultipleItems.Field(description="Update Multiple Items")
    cart_remove_multiple_items = CartRemoveMultipleItems.Field(description="Remove Multiple Items")
