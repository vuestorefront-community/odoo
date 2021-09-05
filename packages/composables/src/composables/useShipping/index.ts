/* eslint-disable no-prototype-builtins */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { Cart } from '@vue-storefront/odoo-api/src/types';

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

    const cart: Cart = await context.$odoo.api.cartLoad({}, {});
    // @todo add shippingmethod add after added to graphql
    if (cart.order?.orderLines?.length > 0) {
      shippingAddress.value = {
        streetName: cart.order.partnerShipping.street,
        apartment: '',
        postalCode: cart.order.partnerShipping.zip,
        phone: cart.order.partnerShipping.phone,
        firstName:
          cart.order.partnerShipping.name === 'Public user'
            ? ''
            : cart.order.partnerShipping.name,
        city: cart.order.partnerShipping.city,
        country: cart.order.partnerShipping.country?.id,
        state: cart.order.partnerShipping.state?.id,
        // cart.shippingMethod?.id
        selectedMethodShipping: 1
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
