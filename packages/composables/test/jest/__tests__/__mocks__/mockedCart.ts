import {
  Cart,
  Category,
  OrderStage,
  Partner,
  PaymentTransaction,
  ProductImage
} from '@vue-storefront/odoo-api/src/types/types';

export const mockedCart: Cart = {
  order: {
    id: 1,
    amountUntaxed: 0,
    currency: { id: 0 },
    name: 'S00290',
    amountTotal: 1643.75,
    amountTax: 0,
    amountDelivery: 10.0,
    stage: OrderStage.SalesOrder,
    orderUrl: 'string',
    transactions: [{} as PaymentTransaction],
    partner: {} as Partner,
    orderLines: [
      {
        id: 451,
        name:
          '[578902-00] Booclothing Lerews beige (36)\nThe Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
        product: {
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
          attributeValues: [],
          categories: [{} as Category],
          weight: 0,
          name: '',
          displayName: 'Booclothing Lerews beige',
          image: 'http://localhost/web/image/product.template/107/image_1920',
          variantImage:
            'http://localhost/web/image/product.product/107/image_1920'
        },
        quantity: 4,
        priceTotal: 186.25
      },
      {
        id: 452,
        name:
          '[578902-00] Blazer Michael Kors brown (36)\nThe Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
        product: {
          id: 53,
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
          attributeValues: [],
          categories: [{} as Category],
          weight: 0,
          name: '',
          displayName: 'Blazer Michael Kors brown',
          image: 'http://localhost/web/image/product.template/53/image_1920',
          variantImage:
            'http://localhost/web/image/product.product/53/image_1920'
        },
        quantity: 1,
        priceTotal: 281.25
      },
      {
        id: 453,
        name:
          '[578902-00] Booclothing Lerews beige (40)\nThe Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
        product: {
          id: 108,
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
          attributeValues: [],
          categories: [{} as Category],
          weight: 0,
          name: '',
          displayName: 'Booclothing Lerews beige',
          image: 'http://localhost/web/image/product.template/108/image_1920',
          variantImage:
            'http://localhost/web/image/product.product/108/image_1920'
        },
        quantity: 1,
        priceTotal: 186.25
      },
      {
        id: 454,
        name:
          '[578902-00] Pullover Moschino Cheap And Chic black (36)\nThe Karissa V-Neck Tee features a semi-fitted shape that\'s flattering for every figure. You can hit the gym with confidence while it hugs curves and hides common "problem" areas. Find stunning women\'s cocktail dresses and party dresses.',
        product: {
          id: 59,
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
          attributeValues: [],
          categories: [{} as Category],
          weight: 0,
          name: '',
          displayName: 'Pullover Moschino Cheap And Chic black',
          image: 'http://localhost/web/image/product.template/59/image_1920',
          variantImage:
            'http://localhost/web/image/product.product/59/image_1920'
        },
        quantity: 4,
        priceTotal: 990
      }
    ],
    partnerInvoice: {
      id: 107,
      contacts: [{} as Partner],
      name: '123',
      street: 'Rua Martagao Gesteira, Apt 102',
      city: 'Salvador',
      phone: null,
      zip: '4543',
      country: {
        id: 1
      },
      state: {
        id: 1
      }
    },
    partnerShipping: {
      id: 128,
      contacts: [{} as Partner],
      name: '123',
      street: '123',
      city: '123',
      phone: '555122311',
      zip: '123',
      country: {
        id: 1
      },
      state: {
        id: 548
      }
    }
  }
};
