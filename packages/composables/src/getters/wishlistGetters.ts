import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { Product } from '@vue-storefront/odoo-api';
import { Wishlist } from '@vue-storefront/odoo-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: Wishlist): Product[] => {
  if (!wishlist) {
    return [];
  }

  return wishlist.items

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (product: Product): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (product: Product): string => product?.image || 'image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (product: Product): AgnosticPrice => {
  return {
    regular: product?.listPrice || 1,
    special: product?.listPrice || 1
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (product: Product): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: Product, filterByAttributeName?: string[]) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: any): string => product?.id || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  const total = wishlist.items.reduce((accumlated, current) => accumlated + current.listPrice, 0)
  return {
    total: total,
    subtotal: total
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: Wishlist): number => wishlist.items?.length;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => String(price);

const wishlistGetters: WishlistGetters<Wishlist, Product> = {
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
