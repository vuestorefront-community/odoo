/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useBilling = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });
  const billingAddress = ref({});

  const resetPasswordErrors = () => (errors.value = { graphQLErrors: [] });

  const load = async () => {
    const cart = await context.$odoo.api.cartLoad({}, {});
    if (cart.data.userShoppingCart.length > 0) {
      const realCart = cart.data.userShoppingCart[0];
      billingAddress.value = {
        streetName: realCart.partnerInvoice.street,
        apartment: '',
        postalCode: realCart.partnerInvoice.zip,
        phone: realCart.partnerInvoice.phone,
        firstName: realCart.partnerInvoice.name,
        city: realCart.partnerInvoice.city,
        country: realCart.partnerInvoice.country?.id,
        state: realCart.partnerInvoice.state?.id
      };
    }

    return billingAddress;
  };

  const useShippingAsBillingAddress = async () => {
    await context.$odoo.api.billingUseShippingAsBillingAddress({}, {});
  };

  return {
    load,
    errors,
    resetPasswordErrors,
    useShippingAsBillingAddress,
    billingAddress
  };
};

export default useBilling;
