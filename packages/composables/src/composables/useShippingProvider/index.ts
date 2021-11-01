/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useShippingProviderFactory,
  UseShippingProviderParams,
  Context
} from '@vue-storefront/core';
import {
  ShippingInfo,
  ShippingMethod
} from '@vue-storefront/odoo-api';

interface ShippingProviderState {
  response: ShippingInfo;
}

const useShippingProviderFactoryParams: UseShippingProviderParams<
  ShippingProviderState,
  ShippingMethod
> = {
  load: async (context: Context, { customQuery, state }) => {
    if (!context.cart.cart?.value?.shippingInfo) {
      await context.cart.load(customQuery);
    }
    return {
      ...state.value,
      response: context.cart.cart.value.shippingInfo
    };
  },
  save: async (context: Context, { shippingMethod, customQuery, state }) => {

    return {

    } as any;
  }
};

const useShippingProvider = useShippingProviderFactory<
  ShippingProviderState,
  ShippingMethod
>(useShippingProviderFactoryParams);

export { useShippingProvider, useShippingProviderFactoryParams };
