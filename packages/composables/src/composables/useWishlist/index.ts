/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { Wishlist } from '@vue-storefront/odoo-api/src/types';
import { ref, Ref } from '@vue/composition-api';
import { WishlistProduct, Product } from '../types';

export const wishlist: Ref<Wishlist> = ref(null);

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
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

    await context.$odoo.api.wishlistRemoveItem(product);

    const wishlist = params.load(context, {});

    return wishlist;
  },

  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return [];
  },

  isInWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.some(item => item.product.id == product.id);
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(params);
