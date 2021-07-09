import cartGetters from '../../../../src/composables/getters/cartGetters';

it('calculate cart subtotal', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151,
    amountDelivery: 10
  };
  const categoryTree = cartGetters.getTotals(cart);

  expect(categoryTree).toStrictEqual({ subtotal: 141, total: 151 });
});

it('cart total items', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30,
    websiteOrderLine: new Array(30)
  };
  const totalItems = cartGetters.getTotalItems(cart);

  expect(totalItems).toBe(30);
});

it('empty cart items', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30
  };
  const totalItems = cartGetters.getTotalItems(cart);

  expect(totalItems).toBe(0);
});

it('cart items', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30,
    websiteOrderLine: [
      { id: 1 },
      { id: 2 }
    ]
  };
  const cartItems = cartGetters.getItems(cart);

  expect(cartItems).toStrictEqual([{ id: 1 }, { id: 2 }]);
});

it('empty cart items', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30,
    websiteOrderLine: []
  };
  const cartItems = cartGetters.getItems(cart);

  expect(cartItems).toStrictEqual([]);
});

