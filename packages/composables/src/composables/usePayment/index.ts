
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import { Order, PaymentProvider } from '@vue-storefront/odoo-api';
import { usePaymentFactory, UsePaymentFactoryParams } from '../../factories/usePaymentFactory';
import useCart from '../useCart';

const factoryParams: UsePaymentFactoryParams<PaymentProvider, Order> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  getPaymentProviderList: async (context: Context, params: any): Promise<PaymentProvider[]> => {
    const { customQuery } = params;

    const { data } = await context.$odoo.api.paymentLoadProviders(params, customQuery);

    return data.paymentAcquirers;
  },
  getPaymentConfirmation: async (context: Context, params: any): Promise<Order> => {
    const { customQuery } = params;

    const { data } = await context.$odoo.api.paymentConfirmation(params, customQuery);

    context.useCart.cart.value = data.paymentConfirmation;

    return data.paymentConfirmation;
  }

};

export default usePaymentFactory<PaymentProvider, Order>(factoryParams);
