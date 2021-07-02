/* eslint-disable camelcase */
import useCart from '../../../src/composables/useCart';

const { load, addItem, removeItem, updateItemQty, isInCart } = useCart() as any;

const websiteOrderLine = [
  {
    id: 68,
    product: {
      id: 22,
      name: '[578902-00] Shirt Himons multi (36)'
    }
  }
];
const loadedShoppingCart = { name: 'S00117', websiteOrderLine };
const context = {
  $odoo: {
    api: {
      cartLoad: jest.fn(() => ({ data: { userShoppingCart: [loadedShoppingCart] } })),
      cartAddItem: jest.fn(() => (loadedShoppingCart)),
      cartRemoveItem: jest.fn(() => ({})),
      cartUpdateItemQty: jest.fn(() => ({}))
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

    expect(cart).toStrictEqual(loadedShoppingCart);
  });

  it('load empty cart', async () => {
    context.$odoo.api.cartLoad = jest.fn(() => ({ data: { userShoppingCart: [] } }));
    const cart = await load(context, {});

    expect(cart).toStrictEqual([]);
  });

  it('adds to cart real product', async () => {
    const product = {
      realProduct: { product_id: 10 }
    };
    const cart = await addItem(context, { product, quantity: 3, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith({ productId: 10, quantity: 3 }, {});
    expect(cart).toStrictEqual([]);
  });

  it('adds to cart first variant item from category', async () => {
    const product = {
      first_variant_id: 5
    };
    const cart = await addItem(context, { product, quantity: 2, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith({ productId: 5, quantity: 2 }, {});
    expect(cart).toStrictEqual([]);
  });

  it('adds to cart first variant item from category jsonrpc call', async () => {
    const product = {
      first_variant_id: 5
    };
    const cart = await addItem(context, { product, quantity: 2, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith({ productId: 5, quantity: 2 }, {});
    expect(cart).toStrictEqual([]);
  });

  it('adds to cart first variant item from category graphql call', async () => {
    const product = {
      firstVariantId: 22
    };
    const cart = await addItem(context, { product, quantity: 1, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).toBeCalledWith({ productId: 22, quantity: 1 }, {});
    expect(cart).toStrictEqual([]);
  });

  it('load cart after add item', async () => {
    const product = {
      firstVariantId: 22
    };
    const cart = await addItem(context, { product, quantity: 1, customQuery: {} });

    expect(context.$odoo.api.cartLoad).toBeCalledTimes(1);
    expect(cart).toStrictEqual([]);
  });

  it('dont add to cart item already in cart', async () => {
    const product = {
      first_variant_id: 22
    };
    await addItem(context, { currentCart: loadedShoppingCart, product, quantity: 1, customQuery: {} });

    expect(context.$odoo.api.cartAddItem).not.toBeCalled();
  });

  it('remove item from cart with saleOrder product', async () => {
    const saleOrderLine = {
      product: { id: 10 }
    };
    await removeItem(context, { product: saleOrderLine, customQuery: {} });

    expect(context.$odoo.api.cartRemoveItem).toBeCalledWith({ productId: 10 }, {});
  });

  it('remove item from cart with saleOrder product', async () => {
    const saleOrderLine = {
      product: { id: 11 }
    };
    await updateItemQty(context, { product: saleOrderLine, quantity: 12, customQuery: {} });

    expect(context.$odoo.api.cartUpdateItemQty).toBeCalledWith({ productId: 11, quantity: 12 }, {});
  });

  it('checks if item is in cart', async () => {
    const product = {
      first_variant_id: 22
    };
    const inCart = await isInCart(context, { currentCart: loadedShoppingCart, product });

    expect(inCart).toBeTruthy();
  });

});
