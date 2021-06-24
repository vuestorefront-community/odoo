/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Product, SaleOrderLine, SaleOrder as Cart, LineItem } from '@vue-storefront/odoo-api/src/types';

export const getCartItems = (cart: Cart): SaleOrderLine[] => {
  if (!cart || !cart.websiteOrderLine) {
    return [];
  }

  return cart.websiteOrderLine;
};

export const getCartItemName = (saleOrderLine: SaleOrderLine): string => saleOrderLine?.product.name || 'Product\'s name';

export const getCartItemImage = (saleOrderLine: SaleOrderLine): string => saleOrderLine?.product?.image;

export const getCartItemPrice = (saleOrderLine: SaleOrderLine): AgnosticPrice => {
  return {
    regular: saleOrderLine?.product?.listPrice || 12,
    special: saleOrderLine?.product?.listPrice || 10
  };
};

export const getCartItemQty = (saleOrderLine: SaleOrderLine): number => saleOrderLine.productUomQty;

export const getCartItemAttributes = (product: Product, filterByAttributeName?: Array<string>) => {
  const attributesList = {};
  return attributesList;
};

export const getCartItemSku = (product: any): string => product?.id || 'some-sku';

export const getCartTotals = (cart: Cart): AgnosticTotals => {

  return {
    total: cart?.amountTotal || 0,
    subtotal: cart?.amountTotal || 0
  };
};

export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartTotalItems = (cart: Cart): number => cart?.websiteOrderLine.length;

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
