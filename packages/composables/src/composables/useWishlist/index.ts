/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import {
  Wishlist,
  WishlistItem,
  Product,
  GraphQlWishlistAddItem
} from '@vue-storefront/odoo-api/src/types';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  load: async (context: Context) => {
    const wishlist = await context.$odoo.api.wishlistLoad();

    return wishlist.wishlistItems;
  },

  addItem: async (context: Context, { currentWishlist, product }) => {
    if (!params.isInWishlist(context, { currentWishlist, product })) {
      const addWishlistItemParams: GraphQlWishlistAddItem = {
        productId: product.first_variant_id
      };

      const wishlist = await context.$odoo.api.wishlistAddItem(
        addWishlistItemParams
      );

      return wishlist.wishlistAddItem;
    }

    return currentWishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product }) => {
    const productIdToCompare =
      product.product.first_variant_id || product.product.id;

    const wishlistItem = currentWishlist.wishlistItems.find(
      (item) => item.product.id == productIdToCompare
    );

    await context.$odoo.api.wishlistRemoveItem(wishlistItem);

    const wishlist = params.load(context, {});

    return wishlist;
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.wishlistItems.some(
      (item) => item.product.id == product.first_variant_id
    );
  },

  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return currentWishlist;
  }
};

export default useWishlistFactory<Wishlist, WishlistItem, Product>(params);
