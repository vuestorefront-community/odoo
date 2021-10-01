/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import { Address, GraphQlAddAddressParams } from '@vue-storefront/odoo-api';
import useCart from '../useCart';

const params: UseUserShippingFactoryParams<any, any> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  addAddress: async (context: Context, { address }) => {
    const params: GraphQlAddAddressParams = {
      street: address.street,
      zip: address.zip,
      phone: address.phone,
      name: address.name,
      city: address.city,
      countryId: Number.parseInt(address.country.id),
      stateId: Number.parseInt(address.state.id)
    };

    await context.$odoo.api.shippingAddAdress(params);

    return address;
  },

  deleteAddress: async (context: Context, params?) => {
    console.log('Mocked: deleteAddress', params);

    return {} as Address;
  },

  updateAddress: async (context: Context, params?) => {
    console.log('Mocked: updateAddress', params);

    return {} as Address;
  },

  load: async (context: Context, params?) => {
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

  setDefaultAddress: async (context: Context, params?) => {
    return {} as Address;
  }
};

export default useUserShippingFactory<any, any>(params);
