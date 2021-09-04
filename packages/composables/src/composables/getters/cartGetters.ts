/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute
} from '@vue-storefront/core';
import {
  Product,
  OrderLine,
  Cart,
  LineItem
} from '@vue-storefront/odoo-api/src/types';

function roundDecimal(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export const getCartItems = (cart: Cart): OrderLine[] => {
  if (!cart || !cart.orderLines) {
    return [];
  }

  return cart.orderLines;
};

export const getCartItemName = (orderLine: OrderLine): string =>
  orderLine?.product.name || 'Product\'s name';

export const getCartItemImage = (orderLine: OrderLine): string =>
  orderLine?.product?.image;

export const getCartItemPrice = (orderLine: OrderLine): AgnosticPrice => {
  return {
    regular: orderLine?.product?.listPrice || 12,
    special: orderLine?.product?.listPrice || 10
  };
};

export const getCartItemQty = (orderLine: OrderLine): number =>
  orderLine.quantity;

export const getCartItemAttributes = (
  product: Product,
  filterByAttributeName?: Array<string>
): Record<string, AgnosticAttribute | string> => {
  const attributesList = {};
  return attributesList;
};

export const getCartItemSku = (product: Product): string =>
  String(product?.id) || 'some-sku';

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: cart?.amountTotal || 0,
    subtotal: roundDecimal(cart?.amountTotal - cart?.orderLines.length) || 0
  };
};

export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartTotalItems = (cart: Cart): number =>
  cart?.orderLines?.length || 0;

export const getFormattedPrice = (price: number): string => String(price);

export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
