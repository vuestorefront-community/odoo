/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Product, SaleOrderLine, SaleOrder as Cart, LineItem } from '@vue-storefront/odoo-api/src/types';

export const getCartItems = (cart: Cart): Product[] => {
  if (!cart || !cart.orderLine) {
    return [];
  }

  return cart.orderLine.map(line => line.product);

};

export const getCartItemName = (product: any): string => product?.name || 'Product\'s name';

export const getCartItemImage = (product: any): string => product?.image || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

export const getCartItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.listPrice || 12,
    special: product?.listPrice || 10
  };
};

export const getCartItemQty = (product: LineItem): number => 1;

export const getCartItemAttributes = (product: Product, filterByAttributeName?: Array<string>) => {
  const attributesList = {};
  return attributesList;
};

export const getCartItemSku = (product: any): string => product?.sku || 'some-sku';

export const getCartTotals = (cart: Cart): AgnosticTotals => {

  return {
    total: cart.amountTotal,
    subtotal: cart.amountTotal
  };
};

export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartTotalItems = (cart: Cart): number => 1;

export const getFormattedPrice = (price: number) => String(price);

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
