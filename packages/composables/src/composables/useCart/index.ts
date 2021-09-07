/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import {
  Cart,
  GraphQlCartAddItemParams,
  GraphQlCartRemoveItemParams,
  OrderLine,
  Product
} from '@vue-storefront/odoo-api/src/types';

const params: UseCartFactoryParams<Cart, OrderLine, Product> = {
  load: async (context: Context, { customQuery }) => {
    const cart = await context.$odoo.api.cartLoad({}, customQuery);

    return cart.cart;
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
      const addItemParams: GraphQlCartAddItemParams = {
        productId,
        quantity
      };
      const cart = await context.$odoo.api.cartAddItem(
        addItemParams,
        customQuery
      );

      return cart.cartAddItem;
    }

    return currentCart;
  },

  removeItem: async (
    context: Context,
    { currentCart, product, customQuery }
  ) => {
    const addItemParams: GraphQlCartRemoveItemParams = {
      lineId: product.id
    };
    const cart = await context.$odoo.api.cartRemoveItem(
      addItemParams,
      customQuery
    );

    return cart.cartRemoveItem;
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
      currentCart?.order?.orderLines?.some(
        (item) => item.product.id === product.first_variant_id
      ) || false
    );
  }
};

export default useCartFactory<Cart, OrderLine, Product>(params);
