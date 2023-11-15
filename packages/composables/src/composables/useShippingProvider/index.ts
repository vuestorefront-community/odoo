/* eslint-disable @typescript-eslint/no-unused-vars */
import { useShippingProviderFactory, UseShippingProviderParams, Context} from '@vue-storefront/core';
import { ShippingInfo, ShippingMethod } from '@vue-storefront/odoo-api';
import { throwErrors } from '../../helpers/index';
import useCart from '../useCart';

interface ShippingProviderState {
  response: ShippingInfo;
}

const useShippingProviderFactoryParams: UseShippingProviderParams<ShippingMethod[], ShippingMethod> = {
  provide() {
    return {
      useCart: useCart()
    };
  },
  load: async (context: Context, { customQuery, state }) => {

    const { data, errors } = await context.$odoo.api.shippingGetDeliveryMethods(customQuery);

    state.value = data.deliveryMethods;

    throwErrors(errors);

    return data.deliveryMethods;
  },
  save: async (context: Context, { shippingMethod, customQuery, state }) => {

    const { data, errors } = await context.$odoo.api.setShippingMethod({ shippingMethodId: shippingMethod.id}, customQuery);

    context.useCart.cart.value.order.shippingMethod = data.setShippingMethod?.order?.shippingMethod;

    throwErrors(errors);

    return [data.setShippingMethod?.order?.shippingMethod];
  }
};

const useShippingProvider = useShippingProviderFactory<ShippingMethod[], ShippingMethod>(useShippingProviderFactoryParams);

export { useShippingProvider, useShippingProviderFactoryParams };
