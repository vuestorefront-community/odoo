/* eslint-disable no-prototype-builtins */
import { ref } from '@vue/composition-api';
import { ComputedProperty, useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { Cart } from '@vue-storefront/odoo-api/src/types';
import useCart from '../useCart';

const useShipping = (): any => {
  const { cart }: { cart: ComputedProperty<Cart> } = useCart();

  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const shippingAddress = ref({});
  const shippingMethods = ref([]);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const searchShippingMethods = async () => {
    if (shippingMethods.value.length > 0) {
      return shippingMethods;
    }

    const response = await context.$odoo.api.shippingGetDeliveryMethods();

    shippingMethods.value = response.deliveryMethods.map((method) => ({
      ...method,
      id: String(method.id)
    }));
  };

  const load = async () => {
    if (shippingAddress?.value?.hasOwnProperty('name')) {
      return shippingAddress;
    }

    // @todo add shippingmethod add after added to graphql
    if (cart.value.order?.partnerShipping) {
      shippingAddress.value = cart.value.order.partnerShipping;
    }

    return shippingAddress;
  };

  return {
    resetCountryErrors,
    load,
    searchShippingMethods,
    shippingAddress,
    shippingMethods,
    errors
  };
};

export default useShipping;
