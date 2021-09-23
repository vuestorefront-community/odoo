/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { ComputedProperty, useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { Cart } from '@vue-storefront/odoo-api/src/types';
import useCart from '../useCart';

const useBilling = (): any => {
  const { cart }: { cart: ComputedProperty<Cart> } = useCart();

  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });
  const billingAddress = ref({
    country: { id: null },
    state: { id: null }
  });

  const resetPasswordErrors = () => (errors.value = { graphQLErrors: [] });

  const load = async () => {
    if (cart.value.order?.partnerInvoice) {
      billingAddress.value = cart.value.order?.partnerInvoice;
      billingAddress.value.country.id = String(
        cart.value.order?.partnerInvoice.country.id
      );
      billingAddress.value.state.id = String(
        cart.value.order?.partnerInvoice.state.id
      );
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
