/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { Context, useBillingFactory, UseBillingParams } from '@vue-storefront/core';
import { Address, GraphQlUpdateAddressParams } from '@vue-storefront/odoo-api/src/types';
import useCart from '../useCart';

const factoryParams: UseBillingParams<Address, GraphQlUpdateAddressParams> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  load: async (context: Context, { customQuery }) => {
    if (!context.useCart.cart) {
      await context.useCart.load();
    }

    const address = context.useCart?.cart?.value?.order?.partnerInvoice || {};

    const billingAddress = {
      ...address,
      country: { id: String(address.country.id) },
      state: { id: String(address.state.id) }
    };

    return billingAddress;
  },

  save: async (context: Context, { billingDetails }) => {

    const params: GraphQlUpdateAddressParams = {
      id: billingDetails.id,
      street: billingDetails.street,
      zip: billingDetails.zip,
      phone: billingDetails.phone,
      name: billingDetails.name,
      city: billingDetails.city,
      countryId: billingDetails.country.id,
      stateId: billingDetails.state.id
    };

    const address = await context.$odoo.api.billingUpdateAddress(params);

    context.useCart.cart.value.order.partnerInvoice = address.updateAddress;

    return address.updateAddress;
  }
};

export default useBillingFactory<Address, GraphQlUpdateAddressParams>(factoryParams);
