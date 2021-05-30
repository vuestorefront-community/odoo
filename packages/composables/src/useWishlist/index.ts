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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {

    const response = await context.$odoo.api.wishlistLoad()

    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {

    await context.$odoo.api.wishlistAddItem(product)

    const response = await context.$odoo.api.wishlistLoad()

    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {

    await context.$odoo.api.wishlistRemoveItem(product)

    const response = await context.$odoo.api.wishlistLoad()

    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return { items: null };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: (context: Context, { currentWishlist, product }) => {
    return currentWishlist?.items?.some(item => item.id == product.id) || false;
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(params);
