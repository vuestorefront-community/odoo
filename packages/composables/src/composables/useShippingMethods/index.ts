/* eslint-disable no-prototype-builtins */
import { Context, useVSFContext } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';

const useShipping = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const shippingMethods = ref([]);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const searchShippingMethods = async () => {
    if (shippingMethods.value.length > 0) {
      return shippingMethods;
    }

    const { data } = await context.$odoo.api.shippingGetDeliveryMethods();

    shippingMethods.value = data.deliveryMethods.map((method) => ({
      ...method,
      id: String(method.id)
    }));
  };

  return {
    resetCountryErrors,
    searchShippingMethods,
    shippingMethods,
    errors
  };
};

export default useShipping;
