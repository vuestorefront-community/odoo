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
  GraphQlWishlistAddItemParams,
  GraphQlWishlistRemoveItemParams
} from '@vue-storefront/odoo-api';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  load: async (context: Context) => {
    const { data } = await context.$odoo.api.wishlistLoad();

    context.$odoo.config.app.$cookies.set('wishlist-size', data?.wishlistItems.wishlistItems?.length || 0);

    return data.wishlistItems;
  },

  addItem: async (context: Context, { currentWishlist, product, customQuery }) => {
    if (!params.isInWishlist(context, { currentWishlist, product })) {
      const addWishlistItemParams: GraphQlWishlistAddItemParams = {
        productId: product.firstVariant
      };

      const { data } = await context.$odoo.api.wishlistAddItem(
        addWishlistItemParams, customQuery
      );

      context.$odoo.config.app.$cookies.set('wishlist-size', data?.wishlistAddItem.wishlistItems?.length || 0);
      return data.wishlistAddItem;
    }

    return currentWishlist;
  },

  removeItem: async (context: Context, { currentWishlist, product, customQuery }) => {
    const productIdToCompare =
      product.product.firstVariant || product.product.id;

    const wishlistItem = currentWishlist.wishlistItems.find(
      (item) => item.product.id == productIdToCompare
    );

    const removeItemParams: GraphQlWishlistRemoveItemParams = {
      wishId: wishlistItem.id
    };

    const { data } = await context.$odoo.api.wishlistRemoveItem(
      removeItemParams, customQuery
    );

    context.$odoo.config.app.$cookies.set('wishlist-size', data?.wishlistRemoveItem.wishlistItems?.length || 0);

    return data.wishlistRemoveItem;
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.wishlistItems.some(
      (item) => item.product.id == product.firstVariant
    );
  },

  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return currentWishlist;
  }
};

export default useWishlistFactory<Wishlist, WishlistItem, Product>(params);
