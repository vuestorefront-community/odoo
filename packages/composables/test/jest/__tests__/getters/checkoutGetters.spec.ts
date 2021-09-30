import { ShippingMethod } from '@vue-storefront/odoo-api/src/types';
import checkoutGetters from '../../../../src/composables/getters/checkoutGetters';

const shippingMethod: ShippingMethod = {
  id: 1,
  name: 'free',
  price: 2
};

it('get shipping method id', () => {
  const methodId = checkoutGetters.getShippingMethodId(shippingMethod);

  expect(methodId).toStrictEqual('1');
});
it('get shipping method name', () => {
  const methodId = checkoutGetters.getShippingMethodName(shippingMethod);

  expect(methodId).toStrictEqual('free');
});

it('get shipping method price', () => {
  const methodId = checkoutGetters.getShippingMethodPrice(shippingMethod);

  expect(methodId).toStrictEqual(2);
});
