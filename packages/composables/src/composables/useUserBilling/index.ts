/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  CustomQuery,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import { GraphQlAddAddressParams, GraphQlDeleteAddressParams, GraphQlUpdateAddressParams, Partner, AddressType } from '@vue-storefront/odoo-api';
import { throwErrors } from '../../helpers/index';
const params: UseUserBillingFactoryParams<Partner[], any> = {
  addAddress: async (context: Context, { address, billing, customQuery }) => {

    const { data } = await context.$odoo.api.billingAddAddress(address, customQuery);

    return [...billing, data.addAddress];
  },

  deleteAddress: async (context: Context, { address, billing, customQuery }) => {
    const deleteParams : GraphQlDeleteAddressParams = {
      id: address.id
    };
    await context.$odoo.api.deleteAddress(deleteParams, customQuery);

    return billing.filter(item => item.id !== address.id);
  },

  updateAddress: async (context: Context, { address, billing, customQuery }) => {

    const { data } = await context.$odoo.api.billingUpdateAddress(address, customQuery);

    const newList = [...billing];
    const index = newList.findIndex((item) => item.id === data.updateAddress.id);
    newList[index] = data.updateAddress;

    return newList;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @TODO add custom query
  load: async (context: Context, params?: any & { customQuery?: CustomQuery }) => {
    const { customQuery } = params;

    const { data } = await context.$odoo.api.billingGetAddress(customQuery);

    return data.addresses;
  },

  setDefaultAddress: async (context: Context, { address, billing }) => {

    const { data, errors } = await context.$odoo.api.setDefaultAddress({ id: address.id, type: AddressType.Billing });

    throwErrors(errors);

    const newList = [...billing];
    const index = newList.findIndex((item) => item.id === data.selectAddress.id);
    newList[index] = data.selectAddress;

    return newList;
  }
};

export default useUserBillingFactory<Partner[], any>(params);
