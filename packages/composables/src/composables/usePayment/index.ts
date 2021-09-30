
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import { Order, PaymentProvider } from '@vue-storefront/odoo-api/src/types';
import { usePaymentFactory, UsePaymentFactoryParams} from '../../factories/usePaymentFactory';

const factoryParams: UsePaymentFactoryParams<PaymentProvider, Order> = {
  getPaymentProviderList: async (context: Context): Promise<PaymentProvider[]> => {

    const { paymentAcquirers }: { paymentAcquirers: PaymentProvider[] } = await context.$odoo.api.paymentLoadProviders();

    return paymentAcquirers;
  },
  getPaymentConfirmation: async (context: Context): Promise<Order> => {
    const { paymentConfirmation } = await context.$odoo.api.paymentConfirmation();

    return paymentConfirmation;
  }

};

export default usePaymentFactory<PaymentProvider, Order>(factoryParams);
