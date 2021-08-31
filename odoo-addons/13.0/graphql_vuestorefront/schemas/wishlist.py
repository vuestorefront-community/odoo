# -*- coding: utf-8 -*-

import graphene
from graphql import GraphQLError
from odoo.http import request
from odoo import fields

from odoo.addons.graphql_vuestorefront.schemas.objects import WishlistItem


class WishlistQuery(graphene.ObjectType):
    wishlist_items = graphene.List(
        graphene.NonNull(WishlistItem),
        required=True,
    )

    @staticmethod
    def resolve_wishlist_items(root, info):
        """ Get current user wishlist items """
        env = info.context['env']
        website = env['website'].get_current_website()
        request.website = website
        return env['product.wishlist'].with_context(display_default_code=False).current()


class WishlistAddItem(graphene.Mutation):
    class Arguments:
        product_id = graphene.Int(required=True)

    Output = WishlistItem

    @staticmethod
    def mutate(self, info, product_id):
        env = info.context["env"]
        website = env['website'].get_current_website()
        request.website = website

        pricelist_context, pl = self._get_pricelist_context()
        p = request.env['product.product'].with_context(pricelist_context, display_default_code=False).browse(product_id)
        price = p._get_combination_info_variant()['price']

        Wishlist = request.env['product.wishlist']
        if request.website.is_public_user():
            Wishlist = Wishlist.sudo()
            partner_id = False
        else:
            partner_id = request.env.user.partner_id.id

        wish_id = Wishlist._add_to_wishlist(
            pl.id,
            pl.currency_id.id,
            request.website.id,
            price,
            product_id,
            partner_id
        )

        if not partner_id:
            request.session['wishlist_ids'] = request.session.get('wishlist_ids', []) + [wish_id.id]

        return wish_id


class WishlistMutation(graphene.ObjectType):
    wishlist_add_item = WishlistAddItem.Field(description="Add Item")
