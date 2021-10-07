/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import { GraphQlAddAddressParams, GraphQlDeleteAddressParams, GraphQlUpdateAddressParams, Partner } from '@vue-storefront/odoo-api';

const params: UseUserBillingFactoryParams<Partner[], any> = {
  addAddress: async (context: Context, { address, billing }) => {

    const params: GraphQlAddAddressParams = {
      street: address.street,
      zip: address.zip,
      phone: address.phone,
      name: address.name,
      city: address.city,
      countryId: Number.parseInt(address.country.id),
      stateId: Number.parseInt(address.state.id)
    };

    const { data } = await context.$odoo.api.billingAddAddress(params);

    return [...billing, data.addAddress];
  },

  deleteAddress: async (context: Context, { address, billing }) => {
    const deleteParams : GraphQlDeleteAddressParams = {
      id: address.id
    };
    await context.$odoo.api.deleteAddress(deleteParams);

    return billing.filter(item => item.id !== address.id);
  },

  updateAddress: async (context: Context, { address, billing }) => {

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
    const { data } = await context.$odoo.api.billingUpdateAddress(params);

    const newList = [...billing];
    const index = newList.findIndex((item) => item.id === data.updateAddress.id);
    newList[index] = data.updateAddress;

    return newList;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    const { data } = await context.$odoo.api.billingGetAddress();

    return data.addresses;
  },

  setDefaultAddress: async (context: Context, params?) => {
    return Promise.resolve([]);
  }
};

export default useUserBillingFactory<Partner[], any>(params);
