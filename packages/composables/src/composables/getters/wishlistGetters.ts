import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { Product } from '@vue-storefront/odoo-api';
import { Wishlist, WishlistItem } from '@vue-storefront/odoo-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: Wishlist): Wishlist => {
  if (!wishlist) {
    return [];
  }

  return wishlist

};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (wishlistItem: WishlistItem): string => wishlistItem?.product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (wishlistItem: WishlistItem): string => wishlistItem?.product?.image || 'image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (wishlistItem: WishlistItem): AgnosticPrice => {
  return {
    regular: wishlistItem?.price || 1,
    special: wishlistItem?.price || 1
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (wishlistItem: WishlistItem): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (wishlistItem: WishlistItem, filterByAttributeName?: string[]) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: any): string => product?.id || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {

  const total = wishlist.reduce((accumlated, current) => accumlated + current.price, 0)
  return {
    total: total,
    subtotal: total
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: Wishlist): number => wishlist?.length;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => String(price);

const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

export default wishlistGetters;
