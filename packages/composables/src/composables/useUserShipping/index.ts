/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import useUser from '../useUser';

const addresses: any[] = [
  {
    id: 1,
    email: 'john@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Warsawska',
    apartment: '24/193A',
    city: 'Phoenix',
    state: null,
    zipCode: '26-620',
    country: 'US',
    phoneNumber: '560123456',
    isDefault: true
  }
];

const userShipping = {
  addresses
};

const params: UseUserShippingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser()
    };
  },

  addAddress: async (context: Context, { address }) => {
    console.log(address, 'my address')
    const shippingAdress = {
      street: address.streetName,
      zip: address.postalCode,
      phone: address.phone,
      name: address.firstName,
      city: address.city,
      countryId: Number.parseInt(address.country),
      stateId: Number.parseInt(address.state)
    };

    console.log(shippingAdress, 'address')

    await context.$odoo.api.shippingAddAdress(shippingAdress).then((res) => {
      console.log(res, 'minha resposta')
    }).catch((err) => {
      console.log('meu erro', err)
    });

    return address;
  },

  deleteAddress: async (context: Context, params?) => {
    console.log('Mocked: deleteAddress', params);

    return Promise.resolve(userShipping);
  },

  updateAddress: async (context: Context, params?) => {
    console.log('Mocked: updateAddress', params);

    return Promise.resolve(userShipping);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    return context.user.user?.value;
  },

  setDefaultAddress: async (context: Context, params?) => {
    return Promise.resolve(userShipping);
  }
};

export default useUserShippingFactory<any, any>(params);
