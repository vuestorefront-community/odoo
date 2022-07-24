/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticAttribute
} from '@vue-storefront/core';
import {
  Product,
  Wishlist,
  WishlistItem
} from '@vue-storefront/odoo-api';

import { useContext } from '@nuxtjs/composition-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: Wishlist): WishlistItem[] => {
  return wishlist.wishlistItems;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (wishlistItem: WishlistItem): string =>
  wishlistItem?.product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (wishlistItem: WishlistItem): string => {
  return wishlistItem?.product?.image || '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImageFilename = (wishlistItem: WishlistItem): string => {
  return wishlistItem?.product?.imageFilename || '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (
  wishlistItem: WishlistItem
): AgnosticPrice => {
  return {
    regular: wishlistItem?.product.price || 1,
    special: wishlistItem?.product.price || 1
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (wishlistItem: WishlistItem): number => 1;

// eslut-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (
  wishlistItem: WishlistItem,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: WishlistItem): string =>
  String(product?.id) || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  const total = wishlist?.wishlistItems?.reduce(
    (accumlated, current) => accumlated + current.product.price,
    0
  );
  return {
    total: total,
    subtotal: total
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: Wishlist): number =>
  wishlist?.wishlistItems?.length;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => String(price);

const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemImageFilename: getWishlistItemImageFilename,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

export default wishlistGetters;
