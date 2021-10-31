/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { Context, useBillingFactory, UseBillingParams } from '@vue-storefront/core';
import { Address, GraphQlUpdateAddressParams } from '@vue-storefront/odoo-api';
import useCart from '../useCart';

const factoryParams: UseBillingParams<any, any> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  load: async (context: Context, { customQuery }) => {
    if (!context.useCart.cart) {
      await context.useCart.load({ customQuery });
    }

    const address = context.useCart?.cart?.value?.order?.partnerInvoice || {};

    const billingAddress = {
      ...address,
      country: { id: String(address?.country?.id || null) },
      state: { id: String(address?.state?.id || null) }
    };

    return billingAddress;
  },

  save: async (context: Context, { billingDetails, customQuery }) => {

    const params: GraphQlUpdateAddressParams = {
      id: billingDetails.id,
      street: billingDetails.street,
      zip: billingDetails.zip,
      phone: billingDetails.phone,
      name: billingDetails.name,
      city: billingDetails.city,
      countryId: parseInt(billingDetails.country.id),
      stateId: parseInt(billingDetails.state.id)
    };

    try {
      const { data } = await context.$odoo.api.billingUpdateAddress(params, customQuery);

      context.useCart.cart.value.order.partnerInvoice = data.updateAddress;

      return data.updateAddress;
    } catch (err) {
      throw new Error(err.map((e) => e.message).join(','));
    }

  }
};

export default useBillingFactory<any, any>(factoryParams);
