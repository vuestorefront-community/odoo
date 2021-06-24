/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { Wishlist, WishlistItem, Product } from '@vue-storefront/odoo-api/src/types';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  load: async (context: Context) => {

    const wishlist = await context.$odoo.api.wishlistLoad();

    return wishlist.data.allWishlistItems.length > 0 ? wishlist.data.allWishlistItems : [];
  },

  addItem: async (context: Context, { currentWishlist, product }) => {

    if (!params.isInWishlist(context, { currentWishlist, product })) {

      await context.$odoo.api.wishlistAddItem(product);
      const wishlist = params.load(context, {});

      return wishlist;
    }

    return currentWishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product }) => {
    const productIdToCompare = product.product.first_variant_id || product.product.id;

    const wishlistItem = currentWishlist.find(item => item.product.id == productIdToCompare);

    await context.$odoo.api.wishlistRemoveItem(wishlistItem);

    const wishlist = params.load(context, {});

    return wishlist;
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.some(item => item.product.id == product.first_variant_id);
  },

  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return [];
  }
};

export default useWishlistFactory<Wishlist, WishlistItem, Product>(params);
