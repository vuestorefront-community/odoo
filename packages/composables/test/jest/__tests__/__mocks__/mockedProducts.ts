import { Product, ProductImage } from '@vue-storefront/odoo-api/src/types/types';

export const mockedProducts: Product[] = [
  {
    id: 36,
    firstVariant: 53,
    smallImage:
      'https://vsfdemo.labs.odoogap.com/web/image/product.template/36/image_128',
    price: 281.25,
    name: 'Blazer Michael Kors brown',
    description:
      'The Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
    image:
      'https://vsfdemo.labs.odoogap.com/web/image/product.template/36/image_1920',
    slug: 'blazer-michael-kors-brown-36',
    sku: null,
    isInWishlist: false,
    qty: 1,
    mediaGallery: [{} as ProductImage],
    priceAfterDiscount: 0,
    hasDiscountedPrice: 0,
    listPrice: 0,
    variantImage: 'http://localhost/web/image/product.product/107/image_1920',
    currency: { id: 0 },
    attributeValues: [],
    weight: 0,
    categories: [
      {
        id: 11,
        name: 'Women',
        slug: 'women-11',
        parent: null
      },
      {
        id: 17,
        name: 'All',
        slug: 'women-clothing-all-17',
        parent: {
          id: 17,
          name: 'clothing',
          slug: 'clothing',
          parent: { id: 11, name: 'women', slug: 'women' }
        }
      },
      {
        id: 19,
        name: 'Blazer',
        slug: 'women-clothing-blazer-19',
        parent: {
          id: 17,
          name: 'clothing',
          slug: 'clothing',
          parent: { id: 11, name: 'women', slug: 'women' }
        }
      }
    ]
  },
  {
    id: 54,
    firstVariant: 107,
    smallImage:
      'https://vsfdemo.labs.odoogap.com/web/image/product.template/54/image_128',
    price: 186.25,
    name: 'Booclothing Lerews beige',
    description:
      'The Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
    image:
      'https://vsfdemo.labs.odoogap.com/web/image/product.template/54/image_1920',
    slug: 'booclothing-lerews-beige-54',
    sku: null,
    isInWishlist: false,
    qty: 1,
    mediaGallery: [{} as ProductImage],
    priceAfterDiscount: 0,
    hasDiscountedPrice: 0,
    listPrice: 0,
    variantImage: 'http://localhost/web/image/product.product/107/image_1920',
    currency: { id: 0 },
    attributeValues: [],
    weight: 0,
    categories: [
      {
        id: 11,
        name: 'Women',
        slug: 'women-11',
        parent: null
      },
      {
        id: 28,
        name: 'All',
        slug: 'women-shoes-all-28',
        parent: {
          id: 18,
          name: 'shoes',
          slug: 'shoes',
          parent: { id: 11, name: 'women', slug: 'women' }
        }
      },
      {
        id: 30,
        name: 'Boots',
        slug: 'women-shoes-boots-30',
        parent: {
          id: 18,
          name: 'shoes',
          slug: 'shoes',
          parent: { id: 11, name: 'women', slug: 'women' }
        }
      }
    ]
  }
];
