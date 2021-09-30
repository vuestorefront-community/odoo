/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { Cart } from '@vue-storefront/odoo-api/src/types';

const useBilling = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });
  const billingAddress = ref({});

  const resetPasswordErrors = () => (errors.value = { graphQLErrors: [] });

  const load = async () => {
    const cart: Cart = await context.$odoo.api.cartLoad({}, {});
    if (cart.order?.orderLines?.length > 0) {
      billingAddress.value = {
        streetName: cart.order.partnerInvoice.street,
        apartment: '',
        postalCode: cart.order.partnerInvoice.zip,
        phone: cart.order.partnerInvoice.phone,
        firstName: cart.order.partnerInvoice.name,
        city: cart.order.partnerInvoice.city,
        country: cart.order.partnerInvoice.country?.id,
        state: cart.order.partnerInvoice.state?.id
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
