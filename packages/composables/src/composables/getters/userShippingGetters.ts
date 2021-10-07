/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserShippingGetters } from '@vue-storefront/core';

const userGetters: UserShippingGetters<any, any> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    return shipping;
  },
  getDefault: shipping => shipping.addresses.find(address => address.isDefault),
  getTotal: shipping => shipping.addresses.length,
  getPostCode: address => address ? address.zip : '',
  getStreetName: address => address ? address.street : '',
  getStreetNumber: address => address ? address.streetNumber : '',
  getCity: address => address ? address.city : '',
  getFirstName: address => address ? address.name : '',
  getLastName: address => address ? address.lastName : '',
  getCountry: address => address ? address.country.name : '',
  getPhone: address => address ? address.phone : '',
  getEmail: address => address ? address.email : '',
  getProvince: address => address ? address.state.name : '',
  getCompanyName: address => address ? address.company : '',
  getTaxNumber: address => address ? address.taxId : '',
  getId: address => address ? address.id : '',
  getApartmentNumber: address => address ? address.apartment : '',
  isDefault: address => address ? address.isDefault : false
};

export default userGetters;
