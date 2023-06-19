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
  OrderStage
} from '@vue-storefront/odoo-api';

function roundDecimal(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export const getCartItems = (cart: Cart): OrderLine[] => {
  if (!cart || !cart?.order?.orderLines) {
    return [];
  }

  return cart?.order?.orderLines;
};

export const getCartItemName = (orderLine: OrderLine): string =>
  orderLine?.product.displayName || 'Product\'s name';

export const getCartItemImage = (orderLine: OrderLine): string => {
  return orderLine?.product?.image || '';
};

export const getCartItemPrice = (orderLine: OrderLine): AgnosticPrice => {
  return {
    regular: orderLine?.product?.combinationInfo?.list_price || 0,
    special: orderLine?.product?.combinationInfo?.price || 0
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

export const getCartItemSku = (orderLine: OrderLine): string =>
  orderLine?.product?.sku || String(orderLine?.product?.id) || 'some-sku';

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: cart?.order?.amountTotal || 0,
    subtotal:
      roundDecimal(cart?.order?.amountTotal - cart?.order?.amountDelivery) || 0
  };
};

export const getItemImageFilename = (orderLine: OrderLine): string =>
  orderLine?.product?.imageFilename || 'Product filename';

export const getCartShippingPrice = (cart: Cart): number =>
  cart?.order?.amountDelivery || 0;

export const getCartTotalItems = (cart: Cart): number =>
  cart?.order?.orderLines?.length || 0;

export const getFormattedPrice = (price: number): string => String(price);

export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

export const getCartOrderNumber = (cart: Cart): string => cart.order.name;

export const getCartState = (cart: Cart): OrderStage => cart.order.stage;

const getCartAmountTax = (cart: Cart): number => {
  return cart?.order?.amountTax || 0;
};

const cartGetters: CartGetters<Cart, OrderLine> = {
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
  getItemImageFilename,
  getCoupons,
  getDiscounts,
  getOrderNumber: getCartOrderNumber,
  getStage: getCartState,
  getAmountTax: getCartAmountTax
};

export default cartGetters;
