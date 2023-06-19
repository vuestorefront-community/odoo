/* eslint-disable camelcase */
import { Order } from '@vue-storefront/odoo-api';
import useCart from '../../../src/composables/useCart';
import { mockedCart } from './__mocks__/mockedCart';
const { load, addItem, removeItem, updateItemQty, isInCart } = useCart() as any;

const context = {
  $odoo: {
    config: {
      app: {
        $cookies: {
          set: jest.fn()
        }
      }
    },
    api: {
      cartLoad: jest.fn(() => ({ data: {cart: mockedCart }})),
      cartAddItem: jest.fn(() => ({ data: { mockedCart: mockedCart } })),
      cartRemoveItem: jest.fn(() => ({ data: { cartRemoveItem: mockedCart }})),
      cartUpdateItemQty: jest.fn(() => ({ data: { cartUpdateItem: mockedCart }}))
    }
  }
};

jest.mock('@vue-storefront/core', () => ({
  useCartFactory: (params) => () => params
}));

describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('load cart', async () => {
    const cart = await load(context, {});

    expect(cart).toStrictEqual(mockedCart);
  });

  it('load empty cart', async () => {
    context.$odoo.api.cartLoad = jest.fn(() => ({ data: { cart: { order: {} as Order }} }));

    const cart = await load(context, {});

    expect(cart).toStrictEqual({ order: {} });
  });

  it('add to cart real product', async () => {
    const product = {
      realProduct: { product: { id: 10 } }
    };
    await addItem(context, {
      product,
      quantity: 3,
      customQuery: {}
    });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith(
      { productId: 10, quantity: 3 },
      {}
    );
  });

  it('add to cart first variant item from category', async () => {
    const product = {
      firstVariant: { id: 5 }
    };
    await addItem(context, { product, quantity: 2, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith(
      {
        productId: 5,
        quantity: 2
      },
      {}
    );
  });

  it('dont add to cart item already in cart', async () => {
    const product = {
      firstVariant: { id: 108 }
    };
    await addItem(context, {
      currentCart: mockedCart,
      product,
      quantity: 1,
      customQuery: {}
    });

    expect(context.$odoo.api.cartAddItem).not.toBeCalled();
  });

  it('remove item from cart with saleOrder product', async () => {
    const orderLine = { id: 10 };
    await removeItem(context, { product: orderLine, customQuery: {} });

    expect(context.$odoo.api.cartRemoveItem).toBeCalledWith({ lineId: 10 }, {});
  });

  it('update item in cart ', async () => {
    await updateItemQty(context, {
      product: { id: 11 },
      quantity: 12,
      customQuery: {}
    });

    expect(context.$odoo.api.cartUpdateItemQty).toBeCalledWith(
      { lineId: 11, quantity: 12 },
      {}
    );
  });

  it('checks if item from category is in cart', async () => {
    const product = {
      firstVariant: { id: 107 }
    };
    const inCart = await isInCart(context, {
      currentCart: mockedCart,
      product
    });

    expect(inCart).toBeTruthy();
  });

  it('checks if item variant from product is in cart', async () => {
    const product = {
      realProduct: {
        product: {
          id: 107
        }
      }
    };
    const inCart = await isInCart(context, {
      currentCart: mockedCart,
      product
    });

    expect(inCart).toBeTruthy();
  });
});
