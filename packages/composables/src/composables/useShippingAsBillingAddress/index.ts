/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ComputedProperty } from '@vue-storefront/core';
import { Cart } from '@vue-storefront/odoo-api/src/types';
import useCart from '../useCart';

const useShippingAsBillingAddress = (): any => {
  const { cart }: { cart: ComputedProperty<Cart> } = useCart();

  const use = async () => {
    const address = cart.value.order.partnerShipping;
    return {
      ...address,
      country: { id: String(address.country.id) },
      state: { id: String(address.state.id) }
    };
  };

  return {
    use
  };
};

export default useShippingAsBillingAddress;
