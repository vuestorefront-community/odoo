/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { Context, useBillingFactory, UseBillingParams } from '@vue-storefront/core';
import { Address, GraphQlAddAddressParams, GraphQlUpdateAddressParams } from '@vue-storefront/odoo-api';
import useCart from '../useCart';

const throwErrors = (errors) => {
  if (errors?.response.data?.networkError) {
    const errorList = errors.response.data?.networkError?.result?.errors || [];
    throw new Error(errorList.map(error => error.message).join(',') || 'Some error');
  }
  if (errors?.response.data?.graphQLErrors) {
    const errorList = errors.response.data?.graphQLErrors || [];
    throw new Error(errorList.map(error => error.message).join(',') || 'Some error');
  }
};

const factoryParams: UseBillingParams<any, GraphQlUpdateAddressParams | GraphQlAddAddressParams> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  load: async (context: Context, { customQuery }) => {
    if (!context.useCart.cart) {
      await context.useCart.load(customQuery);
    }

    const address = context.useCart?.cart?.value?.order?.partnerInvoice || {};

    const billingAddress = {
      ...address,
      country: { id: String(address?.country?.id || null) },
      state: { id: String(address?.state?.id || null) }
    };

    return billingAddress;
  },

  save: async (context: Context, { params, customQuery }) => {

    if ('id' in params && params.id) {

      try {
        const { data } = await context.$odoo.api.billingUpdateAddress(params, customQuery);

        context.useCart.cart.value.order.partnerInvoice = data.updateAddress;

        return data.updateAddress;
      } catch (errors) {
        throwErrors(errors);
      }
    }

    const { data, errors } = await context.$odoo.api.billingAddAddress(params, customQuery);

    throwErrors(errors);

    context.useCart.cart.value.order.partnerShipping = data.addAddress;

    return data.addAddress;

  }
};

export default useBillingFactory<any, GraphQlUpdateAddressParams | GraphQlAddAddressParams>(factoryParams);
