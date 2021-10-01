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
  GraphQlCartUpdateItemQtyParams,
  OrderLine,
  Product
} from '@vue-storefront/odoo-api';

const params: UseCartFactoryParams<Cart, OrderLine, Product> = {
  load: async (context: Context) => {
    const cart = await context.$odoo.api.cartLoad();

    return cart.cart;
  },

  addItem: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    if (!params.isInCart(context, { currentCart, product })) {
      const productId = product.realProduct
        ? product.realProduct.product.id
        : product.firstVariant;

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
    const updateItemParams: GraphQlCartUpdateItemQtyParams = {
      lineId: orderLine.id,
      quantity
    };

    const cart = await context.$odoo.api.cartUpdateItemQty(
      updateItemParams,
      customQuery
    );

    return cart.cartUpdateItem;
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
    const productId = product.realProduct
      ? product.realProduct.product.id
      : product.firstVariant;

    return (
      currentCart?.order?.orderLines?.some(
        (item) => item.product.id === productId
      ) || false
    );
  }
};

export default useCartFactory<Cart, OrderLine, Product>(params);
