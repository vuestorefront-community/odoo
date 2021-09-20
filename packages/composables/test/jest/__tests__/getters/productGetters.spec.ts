import {
  getProductProperties,
  getProductGallery,
  getProductFiltered,
  getProductAttributes
} from '../../../../src/composables/getters/productGetters';
import { Product } from '@vue-storefront/odoo-api/src/types';
import { productVariantsFormatedForProduct } from '../__mocks__/productAttributesFormated';
import { productWithAttributes } from '../__mocks__/productWithAttributes';

it('get empty product Attributes', () => {
  const propertiesWithNull = getProductProperties(null);
  const propertiesWithUndefined = getProductProperties(undefined);

  expect(propertiesWithNull).toStrictEqual([]);
  expect(propertiesWithUndefined).toStrictEqual([]);
});
it('get list of Attributes', () => {
  const properties = getProductProperties(productWithAttributes);

  expect(properties).toStrictEqual(productWithAttributes.attributeValues);
});

it('get empty gallery for no product', () => {
  const expected = [{ big: '', normal: '', small: '' }];
  const galleryWithNull = getProductGallery(null);
  const galleryWithUndefined = getProductGallery(undefined);

  expect(galleryWithNull).toStrictEqual(expected);
  expect(galleryWithUndefined).toStrictEqual(expected);
});

it('get AgnosticMediaGallery with empty image for product without image', () => {
  const galleryWithNull = getProductGallery({} as Product);

  expect(galleryWithNull).toStrictEqual([
    {
      small: '',
      big: '',
      normal: ''
    }
  ]);
});

it('get AgnosticMediaGallery with image for product', () => {
  const product = {
    image: 'http://odoo.com',
    smallImage: 'http://odoo.small.com'
  } as Product;

  const galleryWithNull = getProductGallery(product);

  expect(galleryWithNull).toStrictEqual([
    {
      small: 'http://odoo.small.com',
      big: 'http://odoo.com',
      normal: 'http://odoo.com'
    }
  ]);
});

it('get empty filtered product', () => {
  const productsWithNull = getProductFiltered(null);
  const productsWithUndefined = getProductFiltered(undefined);

  expect(productsWithNull).toStrictEqual([]);
  expect(productsWithUndefined).toStrictEqual([]);
});

it('get grouped attribute list', () => {
  const result = getProductAttributes(productWithAttributes, []);

  expect(result).toStrictEqual(productVariantsFormatedForProduct);
});
