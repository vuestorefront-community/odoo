/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';

const params: UseUserBillingFactoryParams<any, any> = {
  addAddress: async (context: Context, { address }) => {
    const shippingAdress = {
      street: address.streetName,
      houseNumber: '',
      zipCode: address.postalCode,
      phone: address.phone,
      firstName: address.firstName,
      lastName: '',
      city: address.city,
      countryId: Number.parseInt(address.country),
      stateId: Number.parseInt(address.state)
    };

    await context.$odoo.api.billingAddAddress(shippingAdress);

    return address;
  },

  deleteAddress: async (context: Context, params?) => {
    return Promise.resolve([]);
  },

  updateAddress: async (context: Context, params?) => {
    return Promise.resolve([]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    console.log('Mocked: load');
    return Promise.resolve([]);
  },

  setDefaultAddress: async (context: Context, params?) => {
    return Promise.resolve([]);
  }
};

export default useUserBillingFactory<any, any>(params);
