import {
  Category,
  Product,
  ProductImage
} from '@vue-storefront/odoo-api/src/types/types';

export const productWithAttributes: Product = {
  id: 107,
  qty: 1,
  sku: '11',
  smallImage: '',
  mediaGallery: [{} as ProductImage],
  price: 0,
  priceAfterDiscount: 0,
  hasDiscountedPrice: 0,
  listPrice: 0,
  firstVariant: 0,
  currency: { id: 0 },
  isInWishlist: false,
  categories: [{} as Category],
  name: 'Booclothing Lerews beige',
  image: 'http://localhost/web/image/product.template/107/image_1920',
  variantImage: 'http://localhost/web/image/product.product/107/image_1920',
  weight: 0,
  attributeValues: [
    {
      id: 160,
      name: '36',
      displayType: 'select',
      priceExtra: 0,
      attributeName: 'Size',
      search: '4-160'
    },
    {
      id: 161,
      name: '40',
      displayType: 'select',
      priceExtra: 0,
      attributeName: 'Size',
      search: '4-161'
    },
    {
      id: 159,
      name: 'Cotton',
      displayType: 'radio',
      priceExtra: 0,
      attributeName: 'Material',
      search: '5-159'
    }
  ]
};
