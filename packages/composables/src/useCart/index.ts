/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Coupon, Product } from '../types';

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  load: async (context: Context, { customQuery }) => {
    const cartId = context.$odoo.config.app.$cookies.get('cart_id');
    if (!cartId) {
      return [];
    }

    const cart = await context.$odoo.api.loadCart({ id: cartId }, customQuery);

    return cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const addCartResponse = await context.$odoo.api.addToCart({ currentCart, product, quantity }, customQuery);

    context.$odoo.config.app.$cookies.set('cart_id', addCartResponse.line_id);

    const cart = await context.$odoo.api.loadCart({id: addCartResponse.line_id}, customQuery);

    return cart;
  },

  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    console.log('Mocked: removeFromCart');
    return {};
  },

  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: updateQuantity');
    return {};
  },

  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return {};
  },

  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: {}, updatedCoupon: {}};
  },

  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: {}};
  },

  isOnCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: isOnCart');
    return false;
  }
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
