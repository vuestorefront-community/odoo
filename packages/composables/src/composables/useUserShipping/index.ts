/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  CustomQuery,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import { Partner, GraphQlAddAddressParams, GraphQlDeleteAddressParams, GraphQlUpdateAddressParams, AddressType } from '@vue-storefront/odoo-api';
import { throwErrors } from '@vue-storefront/odoo/src/helpers/graphqlError';
const params: UseUserShippingFactoryParams<Partner[], any> = {
  addAddress: async (context: Context, { address, shipping, customQuery }) => {

    const { data } = await context.$odoo.api.shippingAddAdress(address, customQuery);

    return [...shipping, data.addAddress];
  },

  deleteAddress: async (context: Context, { address, shipping, customQuery }) => {
    const deleteParams : GraphQlDeleteAddressParams = {
      id: address.id
    };
    await context.$odoo.api.deleteAddress(deleteParams, customQuery);

    return shipping.filter(item => item.id !== address.id);
  },

  updateAddress: async (context: Context, { address, shipping, customQuery }) => {

    const { data } = await context.$odoo.api.shippingUpdateAddress(address, customQuery);

    const newList = [...shipping];
    const index = newList.findIndex((item) => item.id === data.updateAddress.id);
    newList[index] = data.updateAddress;

    return newList;
  },

  // @TODO add custom query
  load: async (context: Context, params?: any) => {
    const { customQuery } = params;

    const { data } = await context.$odoo.api.shippingGetAddress(customQuery);

    return data.addresses;
  },

  setDefaultAddress: async (context: Context, { address, shipping }) => {

    const { data, errors } = await context.$odoo.api.setDefaultAddress({ id: address.id, type: AddressType.Shipping });

    throwErrors(errors);

    const newList = [...shipping];
    const index = newList.findIndex((item) => item.id === data.selectAddress.id);
    newList[index] = data.selectAddress;

    return newList;
  }
};

export default useUserShippingFactory<Partner[], Partner>(params);
