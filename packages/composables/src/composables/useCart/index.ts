/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Coupon } from '../types';
import { SaleOrder as Cart, SaleOrderLine, Product } from '@vue-storefront/odoo-api/src/types';

const params: UseCartFactoryParams<Cart, SaleOrderLine, Product, Coupon> = {

  load: async (context: Context, { customQuery }) => {
    const cart = await context.$odoo.api.cartLoad({}, customQuery);

    return cart.data.userShoppingCart.length > 0 ? cart.data.userShoppingCart[0] : [];
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
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

  removeItem: async (context: Context, { currentCart, product: saleOrderLine, customQuery }) => {

    await context.$odoo.api.cartRemoveItem({ productId: saleOrderLine.product.id }, customQuery);

    const cart = params.load(context, {});

    return cart;
  },

  updateItemQty: async (context: Context, { currentCart, product: saleOrderLine, quantity, customQuery }) => {

    await context.$odoo.api.cartUpdateItemQty({ productId: saleOrderLine.product.id, quantity }, customQuery);

    const cart = params.load(context, {});

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

  isInCart: (context: Context, { currentCart, product }) => {
    return currentCart?.websiteOrderLine?.some(item => item.product.id == product.first_variant_id) || false;
  }
};

export default useCartFactory<Cart, SaleOrderLine, Product, Coupon>(params);

