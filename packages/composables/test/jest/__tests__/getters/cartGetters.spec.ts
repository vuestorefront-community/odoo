import cartGetters from '../../../../src/composables/getters/cartGetters';
import { mockedCart } from '../__mocks__/mockedCart';
it('calculate cart subtotal', () => {
  const categoryTree = cartGetters.getTotals(mockedCart);

  expect(categoryTree).toStrictEqual({ subtotal: 1639.75, total: 1643.75 });
});

it('cart total items', () => {
  const totalItems = cartGetters.getTotalItems(mockedCart);

  expect(totalItems).toBe(4);
});
