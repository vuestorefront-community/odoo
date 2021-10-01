
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

  getPaymentProviderList: async (context: Context): Promise<PaymentProvider[]> => {

    const { paymentAcquirers }: { paymentAcquirers: PaymentProvider[] } = await context.$odoo.api.paymentLoadProviders();

    return paymentAcquirers;
  },
  getPaymentConfirmation: async (context: Context): Promise<Order> => {
    const { paymentConfirmation } = await context.$odoo.api.paymentConfirmation();

    context.useCart.cart.value = paymentConfirmation;

    return paymentConfirmation;
  }

};

export default usePaymentFactory<PaymentProvider, Order>(factoryParams);
