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
  Attribute,
  AttributeValue
} from '@vue-storefront/odoo-api';

type ProductFilters = any;

export const getProductName = (product: Product): string =>
  product?.name || 'Product\'s name';

export const getProductProperties = (product: Product): AttributeValue[] =>
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

  const normal = product?.realProduct?.product?.image || product?.image || '';
  const big = normal;

  images.push({
    small: `${product?.smallImage || ''}`,
    big,
    normal
  });

  return images;
};

export const getProductCoverImage = (product: Product): string => {

  return product?.image || '';
};

export const getProductImageFilename = (product: Product): string => {

  return product?.imageFilename || '';
};

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
    groupedByName[option.attribute.name] = {
      type: option.displayType,
      variantId: option.id,
      label: option.attribute.name,
      values: []
    };
  });
  product?.attributeValues?.forEach((option) => {
    groupedByName[option.attribute.name].values.push({
      value: String(option.id),
      label: option.name
    });
  });

  product?.attributeValues?.forEach((option) => {
    if (!attributes[option.displayType]) {
      attributes[option.displayType] = [];
    }
    if (
      groupedByName[option.attribute.name].type === option.displayType &&
      !attributes[option.displayType].some(
        (item) =>
          item.variantId === groupedByName[option.attribute.name].variantId
      )
    ) {
      attributes[option.displayType].push(groupedByName[option.attribute.name]);
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
  getImageFilename: getProductImageFilename,
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
