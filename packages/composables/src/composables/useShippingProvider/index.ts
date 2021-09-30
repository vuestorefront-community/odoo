/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useShippingProviderFactory,
  UseShippingProviderParams,
  Context
} from '@vue-storefront/core';
import {
  ShippingInfo,
  ShippingMethod
} from '@vue-storefront/odoo-api/src/types';

interface ShippingProviderState {
  response: ShippingInfo;
}

const useShippingProviderFactoryParams: UseShippingProviderParams<
  ShippingProviderState,
  ShippingMethod
> = {
  load: async (context: Context, { customQuery, state }) => {
    if (!context.cart.cart?.value?.shippingInfo) {
      await context.cart.load({ customQuery });
    }
    return {
      ...state.value,
      response: context.cart.cart.value.shippingInfo
    };
  },
  save: async (context: Context, { shippingMethod, customQuery, state }) => {
    const cartResponse = await context.$ct.api.updateCart(
      {
        id: context.cart.cart.value.id,
        version: context.cart.cart.value.version,
        actions: []
      },
      customQuery
    );
    context.cart.setCart(cartResponse.data.cart);

    return {
      ...state.value,
      response: context.cart.cart.value.shippingInfo
    };
  }
};

const useShippingProvider = useShippingProviderFactory<
  ShippingProviderState,
  ShippingMethod
>(useShippingProviderFactoryParams);

export { useShippingProvider, useShippingProviderFactoryParams };
