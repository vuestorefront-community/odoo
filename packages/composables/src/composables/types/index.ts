import { FacetSearchResult } from '@vue-storefront/core';
import {
  Attribute,
  Category,
  Product
} from '@vue-storefront/odoo-api/src/types';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export interface UsePassword<> {
  sendResetPassword: (params: { email: string }) => Promise<void>;
}

export type UserAddress = Record<string, unknown>;

export type Cart = Record<string, unknown>;

export type CartItem = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export interface FacetResultsData {
  products: Product[];
  categories: Category[];
  facets: Record<string, string>;
  totalProducts: number;
  perPageOptions: number;
  itemsPerPage: number;
  attributes: Attribute[];
}

export type SearchData = FacetSearchResult<FacetResultsData>;
