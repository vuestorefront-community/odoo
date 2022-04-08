/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { Context, useShippingFactory, UseShippingParams } from '@vue-storefront/core';
import { GraphQlUpdateAddressParams, Partner } from '@vue-storefront/odoo-api';
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

const factoryParams: UseShippingParams<Partner, GraphQlUpdateAddressParams> = {
  provide() {
    return {
      useCart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.useCart.cart) {
      await context.useCart.load(customQuery);
    }

    const address = context.useCart?.cart?.value?.order?.partnerShipping || {};

    const shippingAdress = {
      ...address,
      country: { id: String(address?.country?.id) },
      state: { id: String(address?.state?.id) }
    };

    return shippingAdress;
  },

  save: async (context: Context, { params, customQuery }) => {
    if (params.id) {
      try {
        const { data } = await context.$odoo.api.shippingUpdateAddress(params, customQuery);

        context.useCart.cart.value.order.partnerShipping = data.updateAddress;
        return data.updateAddress;
      } catch (errors) {
        throwErrors(errors);
      }
    }

    const { data, errors } = await context.$odoo.api.shippingAddAdress(params, customQuery);

    throwErrors(errors);

    context.useCart.cart.value.order.partnerShipping = data.addAddress;
    return data.addAddress;

  }
};

export default useShippingFactory<Partner, GraphQlUpdateAddressParams>(factoryParams);

