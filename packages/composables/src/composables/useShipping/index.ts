/* eslint-disable no-prototype-builtins */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useShipping = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const shippingAddress = ref({});
  const shippingMethods = ref([]);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const searchShippingMethods = async () => {
    if (shippingMethods.value.length > 0) {
      return shippingMethods;
    }

    shippingMethods.value = await context.$odoo.api.shippingGetDeliveryMethods(
      {},
      {}
    );
  };

  const load = async () => {
    if (shippingAddress?.value?.hasOwnProperty('firstName')) {
      return shippingAddress;
    }

    const cart = await context.$odoo.api.cartLoad({}, {});
    if (cart.data.userShoppingCart.length > 0) {
      const realCart = cart.data.userShoppingCart[0];
      shippingAddress.value = {
        streetName: realCart.partnerShipping.street,
        apartment: '',
        postalCode: realCart.partnerShipping.zip,
        phone: realCart.partnerShipping.phone,
        firstName:
          realCart.partnerShipping.name === 'Public user'
            ? ''
            : realCart.partnerShipping.name,
        city: realCart.partnerShipping.city,
        country: realCart.partnerShipping.country?.id,
        state: realCart.partnerShipping.state?.id,
        selectedMethodShipping: realCart.shippingMethod?.id
      };
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
