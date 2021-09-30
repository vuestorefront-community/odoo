/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import {
  Product,
  ProductVariant,
  Attribute
} from '@vue-storefront/odoo-api/src/types';

type ProductFilters = any;

// TODO: Add interfaces for some of the methods in core
// Product

export const getProductName = (product: Product): string =>
  product?.name || 'Product\'s name';

export const getProductProperties = (product: Product): Attribute[] =>
  product?.attributeValues || [];

export const getProductCode = (product: Product): string => product?.sku || '';

export const getProductSlug = (product: Product): string => product?.slug || '';

export const getProductPrice = (product: Product): AgnosticPrice => {
  return {
    regular: product?.listPrice || product?.price,
    special: product?.listPrice || product?.price
  };
};

export const getProductGallery = (
  product: Product
): AgnosticMediaGalleryItem[] => {
  const images: AgnosticMediaGalleryItem[] = [];

  images.push({
    small: product?.smallImage || '',
    big: product?.realProduct?.product.image || product?.image || '',
    normal: product?.realProduct?.product.image || product?.image || ''
  });

  return images;
};

export const getProductCoverImage = (product: Product): string => product.image;

export const getProductSku = (product: Product): string => product.sku;

export const getProductFiltered = (
  products: Product[],
  filters: ProductFilters | Product[] = {}
): Product[] => {
  if (!products) {
    return [];
  }

  return products;
};
// es
export const getProductAttributes = (
  product: Product,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  const groupedByName = {};

  product?.attributeValues?.forEach((option) => {
    groupedByName[option.attributeName] = {
      type: option.displayType,
      variantId: option.id,
      label: option.attributeName,
      values: []
    };
  });
  product?.attributeValues?.forEach((option) => {
    groupedByName[option.attributeName].values.push({
      value: String(option.id),
      label: option.name
    });
  });

  product?.attributeValues?.forEach((option) => {
    if (!attributes[option.displayType]) {
      attributes[option.displayType] = [];
    }
    if (
      groupedByName[option.attributeName].type === option.displayType &&
      !attributes[option.displayType].some(
        (item) =>
          item.variantId === groupedByName[option.attributeName].variantId
      )
    ) {
      attributes[option.displayType].push(groupedByName[option.attributeName]);
    }
  });

  return attributes;
};

export const getProductDescription = (product: Product): any =>
  (product as any)?.description || '';

export const getProductCategoryIds = (product: Product): string[] =>
  (product as any)?.categoriesRef || '';

export const getProductId = (product: Product): string =>
  (product as any)?.id || '';

export const getFormattedPrice = (listPrice: number): string =>
  String(listPrice);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: Product): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: Product): number => 0;

const productGetters: ProductGetters<
  Product | ProductVariant,
  ProductFilters
> = {
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
