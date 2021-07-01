import cartGetters from '../../../src/composables/getters/cartGetters';

test('calculate cart subtotal', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151,
    amountDelivery: 10
  };
  const categoryTree = cartGetters.getTotals(cart);

  expect(categoryTree).toStrictEqual({ subtotal: 141, total: 151 });
});

test('calculate cart float subtotal', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30
  };
  const totals = cartGetters.getTotals(cart);

  expect(totals).toStrictEqual({ subtotal: 141.30, total: 151.60 });
});

test('cart total items', () => {
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

test('empty cart items', () => {
  const cart = {
    id: 1,
    name: '',
    amountTotal: 151.60,
    amountDelivery: 10.30
  };
  const totalItems = cartGetters.getTotalItems(cart);

  expect(totalItems).toBe(0);
});

test('cart items', () => {
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

test('empty cart items', () => {
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
