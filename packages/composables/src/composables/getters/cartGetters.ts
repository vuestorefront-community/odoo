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
  LineItem,
  OrderStage
} from '@vue-storefront/odoo-api';
import { getCurrentInstance } from '@vue/composition-api';

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

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
  const { $config } = getInstance();

  return `${$config.baseURL}${orderLine?.product?.image?.replace('/', '')}`;
};

export const getCartItemPrice = (orderLine: OrderLine): AgnosticPrice => {
  return {
    regular: orderLine?.priceTotal || 12,
    special: orderLine?.priceTotal || 10
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
  product?.sku || String(product?.id) || 'some-sku';

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: cart?.order?.amountTotal || 0,
    subtotal:
      roundDecimal(cart?.order?.amountTotal - cart?.order?.amountDelivery) || 0
  };
};

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
  getDiscounts,
  getOrderNumber: getCartOrderNumber,
  getStage: getCartState,
  getAmountTax: getCartAmountTax
};

export default cartGetters;
