/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Coupon } from '../types';
import { Cart, OrderLine, Product } from '@vue-storefront/odoo-api/src/types';

const params: UseCartFactoryParams<Cart, OrderLine, Product> = {
  load: async (context: Context, { customQuery }) => {
    const cart: Cart = await context.$odoo.api.cartLoad({}, customQuery);

    return cart;
  },

  addItem: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    let productId = null;
    if (product.realProduct) {
      productId = product.realProduct.product_id;
    }
    if (!product.realProduct) {
      productId = product.first_variant_id || product.firstVariantId;
    }

    if (!params.isInCart(context, { currentCart, product })) {
      await context.$odoo.api.cartAddItem({ productId, quantity }, customQuery);
      const cart = params.load(context, {});

      return cart;
    }

    return currentCart;
  },

  removeItem: async (
    context: Context,
    { currentCart, product: orderLine, customQuery }
  ) => {
    await context.$odoo.api.cartRemoveItem(
      { productId: orderLine.product.id },
      customQuery
    );

    const cart = params.load(context, {});

    return cart;
  },

  updateItemQty: async (
    context: Context,
    { currentCart, product: orderLine, quantity, customQuery }
  ) => {
    await context.$odoo.api.cartUpdateItemQty(
      { productId: orderLine.product.id, quantity },
      customQuery
    );

    const cart = params.load(context, {});

    return cart;
  },

  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return currentCart;
  },

  applyCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: applyCoupon');
    return { updatedCart: currentCart, updatedCoupon: {} };
  },

  removeCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  isInCart: (context: Context, { currentCart, product }) => {
    return (
      currentCart?.orderLines?.some(
        (item) => item.product.id === product.first_variant_id
      ) || false
    );
  }
};

export default useCartFactory<Cart, OrderLine, Product>(params);
