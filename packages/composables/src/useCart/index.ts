/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { CartItem, Coupon, Product } from '../types';
import { SaleOrder as Cart, SaleOrderLine } from '@vue-storefront/odoo-api/src/types';

const cartId = 261 //@todo refact to ID response from cart api

const params: UseCartFactoryParams<Cart, SaleOrderLine, Product, Coupon> = {

  load: async (context: Context, { customQuery }) => {
    const cartId = context.$odoo.config.app.$cookies.get('cart_id');
    if (!cartId) {
      return [];
    }

    const cart = await context.$odoo.api.cartLoad({ id: cartId }, customQuery);

    return cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    await context.$odoo.api.cartAddItem({ productId: product.id, quantity }, customQuery);

    context.$odoo.config.app.$cookies.set('cart_id', cartId);

    const cart = await context.$odoo.api.cartLoad({ id: cartId }, customQuery);

    return cart;
  },

  removeItem: async (context: Context, { currentCart, product, customQuery }) => {

    await context.$odoo.api.cartRemoveItem({ productId: product.product.id }, customQuery);

    const cart = await context.$odoo.api.cartLoad({ id: cartId }, customQuery);

    return cart;
  },

  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    await context.$odoo.api.cartUpdateItemQty({ productId: product.product.id, quantity }, customQuery);

    const cart = await context.$odoo.api.cartLoad({ id: cartId }, customQuery);

    return cart;
  },

  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return currentCart;
  },

  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return { updatedCart: currentCart, updatedCoupon: {} };
  },

  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  isOnCart: (context: Context, { currentCart, product }) => {
    return currentCart?.orderLine?.some(item => item.product.id === product.id) || false;
  }
};

export default useCartFactory<Cart, SaleOrderLine, Product, Coupon>(params);
