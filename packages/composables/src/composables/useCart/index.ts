/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
const resolvePath = (object, path, defaultValue) => path
  .split('.')
  .reduce((o, p) => o ? o[p] : defaultValue, object);

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
  GraphQlApplyCouponParams,
  OrderLine,
  Product
} from '@vue-storefront/odoo-api';

const params: UseCartFactoryParams<Cart, OrderLine, Product> = {
  load: async (context: Context, { customQuery }) => {
    const { data } = await context.$odoo.api.cartLoad(customQuery);

    const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
    context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cart?.order, cookieIndex, 0) || 0);

    return data.cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    if (!params.isInCart(context, { currentCart, product })) {
      const productId = product.realProduct
        ? product.realProduct?.product?.id
        : product.firstVariant.id;

      const addItemParams: GraphQlCartAddItemParams = {
        productId,
        quantity
      };
      const { data } = await context.$odoo.api.cartAddItem(
        addItemParams,
        customQuery
      );

      const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
      context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cartAddItem?.order, cookieIndex, 0) || 0);

      return data?.cartAddItem;
    }

    return currentCart;
  },

  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const addItemParams: GraphQlCartRemoveItemParams = {
      lineId: product.id
    };
    const { data } = await context.$odoo.api.cartRemoveItem(
      addItemParams,
      customQuery
    );
    const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
    context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cartRemoveItem?.order, cookieIndex, 0) || 0);

    return data?.cartRemoveItem;
  },

  updateItemQty: async (context: Context, { currentCart, product: orderLine, quantity, customQuery }) => {
    const updateItemParams: GraphQlCartUpdateItemQtyParams = {
      lineId: orderLine.id,
      quantity
    };

    const { data } = await context.$odoo.api.cartUpdateItemQty(
      updateItemParams,
      customQuery
    );

    const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
    context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cartUpdateItem?.order, cookieIndex, 0) || 0);

    return data?.cartUpdateItem;
  },

  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return currentCart;
  },

  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {

    const params : GraphQlApplyCouponParams = { promo: couponCode };

    const { data, errors } = await context.$odoo.api.applyCoupon(params, customQuery);

    if (data.applyCoupon?.error) {
      const { data: cartData } = await context.$odoo.api.cartLoad(customQuery);
      return {
        updatedCart: cartData.cart,
        updatedCoupon: { applied: data.applyCoupon?.error }
      };
    }

    return { updatedCart: currentCart, updatedCoupon: { applied: data.applyCoupon?.error } };
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
      : product.firstVariant.id;

    return (
      currentCart?.order?.orderLines?.some(
        (item) => item.product.id === productId
      ) || false
    );
  }
};

export default useCartFactory<Cart, OrderLine, Product>(params);
