/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { Context, useShippingFactory, UseShippingParams } from '@vue-storefront/core';
import { GraphQlUpdateAddressParams, Partner } from '@vue-storefront/odoo-api';
import useCart from '../useCart';

const factoryParams: UseShippingParams<Partner, GraphQlUpdateAddressParams> = {
  provide() {
    return {
      useCart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.useCart.cart) {
      await context.useCart.load();
    }

    const address = context.useCart?.cart?.value?.order?.partnerShipping || {};

    const shippingAdress = {
      ...address,
      country: { id: String(address.country.id) },
      state: { id: String(address.state.id) }
    };

    return shippingAdress;
  },

  save: async (context: Context, { shippingDetails }) => {

    const params: GraphQlUpdateAddressParams = {
      id: shippingDetails.id,
      street: shippingDetails.street,
      zip: shippingDetails.zip,
      phone: shippingDetails.phone,
      name: shippingDetails.name,
      city: shippingDetails.city,
      countryId: shippingDetails.country.id,
      stateId: shippingDetails.state.id
    };

    const { data } = await context.$odoo.api.shippingUpdateAddress(params);

    context.useCart.cart.value.order.partnerShipping = data.updateAddress;

    return data.updateAddress;
  }
};

export default useShippingFactory<Partner, GraphQlUpdateAddressParams>(factoryParams);

