# -*- coding: utf-8 -*-
# Copyright 2021 ODOOGAP/PROMPTEQUATION LDA
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import fields

from odoo.addons.graphql_vuestorefront.schemas.objects import WishlistItem


class WishlistItems(graphene.Interface):
    wishlist_items = graphene.List(WishlistItem)


class WishlistData(graphene.ObjectType):
    class Meta:
        interfaces = (WishlistItems,)


class WishlistQuery(graphene.ObjectType):
    wishlist_items = graphene.Field(
        WishlistData,
    )

    @staticmethod
    def resolve_wishlist_items(root, info):
        """ Get current user wishlist items """
        env = info.context['env']
        website = env['website'].get_current_website()
        request.website = website
        wishlist_items = env['product.wishlist'].current()
        return WishlistData(wishlist_items=wishlist_items)


class WishlistAddItem(graphene.Mutation):
    class Arguments:
        product_id = graphene.Int(required=True)

    Output = WishlistData

    @staticmethod
    def mutate(self, info, product_id):
        env = info.context["env"]
        Wishlist = env['product.wishlist']
        website = env['website'].get_current_website()
        request.website = website
        pricelist = website.get_current_pricelist()

        # Partner
        if request.website.is_public_user():
            Wishlist = Wishlist.sudo()
            partner_id = False
        else:
            partner_id = request.env.user.partner_id.id

        product = env['product.product'].search([('id', '=', product_id)])

        #  Conditions
        if not product:
            raise GraphQLError('Product does not Exist.')

        if product._is_in_wishlist():
            raise GraphQLError('Product is already in the Wishlist.')

        # Price
        price = product._get_combination_info_variant()['price']

        # Add wish_id to Wishlist
        wish_id = Wishlist._add_to_wishlist(
            pricelist.id,
            pricelist.currency_id.id,
            website.id,
            price,
            product_id,
            partner_id
        )

        if not partner_id:
            request.session['wishlist_ids'] = request.session.get('wishlist_ids', []) + [wish_id.id]

        wishlist_items = env['product.wishlist'].current()
        return WishlistData(wishlist_items=wishlist_items)


class WishlistRemoveItem(graphene.Mutation):
    class Arguments:
       wish_id = graphene.Int(required=True)

    Output = WishlistData

    @staticmethod
    def mutate(self, info, wish_id):
        env = info.context['env']
        Wishlist = env['product.wishlist'].sudo()

        wish_id = Wishlist.search([('id', '=', wish_id)], limit=1)
        wish_id.unlink()

        website = env['website'].get_current_website()
        request.website = website
        wishlist_items = env['product.wishlist'].current()

        return WishlistData(wishlist_items=wishlist_items)


class WishlistMutation(graphene.ObjectType):
    wishlist_add_item = WishlistAddItem.Field(description="Add Item")
    wishlist_remove_item = WishlistRemoveItem.Field(description="Remove Item")
