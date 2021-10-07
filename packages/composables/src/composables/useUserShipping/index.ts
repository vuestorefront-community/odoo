/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import { Partner, GraphQlAddAddressParams, GraphQlDeleteAddressParams, GraphQlUpdateAddressParams } from '@vue-storefront/odoo-api';

const params: UseUserShippingFactoryParams<Partner[], any> = {
  addAddress: async (context: Context, { address, shipping }) => {

    const params: GraphQlAddAddressParams = {
      street: address.street,
      zip: address.zip,
      phone: address.phone,
      name: address.name,
      city: address.city,
      countryId: Number.parseInt(address.country.id),
      stateId: Number.parseInt(address.state.id)
    };

    const { data } = await context.$odoo.api.shippingAddAdress(params);

    return [...shipping, data.addAddress];
  },

  deleteAddress: async (context: Context, { address, shipping }) => {
    const deleteParams : GraphQlDeleteAddressParams = {
      id: address.id
    };
    await context.$odoo.api.deleteAddress(deleteParams);

    return shipping.filter(item => item.id !== address.id);
  },

  updateAddress: async (context: Context, { address, shipping }) => {

    const params: GraphQlUpdateAddressParams = {
      id: address.id,
      street: address.street,
      zip: address.zip,
      phone: address.phone,
      name: address.name,
      city: address.city,
      countryId: Number.parseInt(address.country.id),
      stateId: Number.parseInt(address.state.id)
    };
    const { data } = await context.$odoo.api.shippingUpdateAddress(params);

    const newList = [...shipping];
    const index = newList.findIndex((item) => item.id === data.updateAddress.id);
    newList[index] = data.updateAddress;

    return newList;
  },

  load: async (context: Context, params?) => {
    const { data } = await context.$odoo.api.shippingGetAddress();

    return data.addresses;
  },

  setDefaultAddress: async (context: Context, { shipping }) => {
    return [...shipping];
  }
};

export default useUserShippingFactory<Partner[], Partner>(params);
