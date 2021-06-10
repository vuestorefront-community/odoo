/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product, Attribute } from '@vue-storefront/odoo-api/src/types';

type ProductFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

export const getProductName = (product: Product): string => product?.name || 'Product\'s name';

export const getProductProperties = (product: Product): Attribute[] => product?.attributes || [];

export const getProductCode = (product: Product): string => product?.defaultCode || '';

export const getProductSlug = (product: Product): string => product.slug;

export const getProductPrice = (product: Product): AgnosticPrice => {
  return {
    regular: product?.listPrice || 0,
    special: product?.listPrice || 0
  };
};

export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  if (!product) {
    return [];
  }

  const images: AgnosticMediaGalleryItem[] = [
    {
      small: product.image,
      big: product.image,
      normal: product.image
    }
  ];

  return images;
};

export const getProductCoverImage = (product: Product): string => product.image;

export const getProductSku = (product: Product): string => product.sku;

export const getProductFiltered = (products: Product[], filters: ProductFilters | any = {}): Product[] => {
  if (!products) {
    return [];
  }

  return products;
};
// es
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: Product): any => (product as any)?.description || '';

export const getProductCategoryIds = (product: Product): string[] => (product as any)?.categoriesRef || '';

export const getProductId = (product: Product): string => (product as any)?.id || '';

export const getFormattedPrice = (listPrice: number): string => String(listPrice);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: Product): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: Product): number => 0;

const productGetters: ProductGetters<Product, ProductFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getProperties: getProductProperties,
  getCode: getProductCode,
  getSku: getProductSku
};

export default productGetters;
