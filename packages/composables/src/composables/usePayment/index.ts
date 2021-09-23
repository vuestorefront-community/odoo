/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import { PaymentProvider, Provider } from '@vue-storefront/odoo-api/src/types';
import { usePaymentFactory, UsePaymentFactoryParams} from '../../factories/usePaymentFactory';

const factoryParams: UsePaymentFactoryParams<PaymentProvider, any> = {
  getPaymentProviderList: (context: Context<any, any, any>, params: { customQuery?: any }): PaymentProvider[] => {

    return [{
      id: 1,
      name: 'AdyenPaymentProvider',
      provider: Provider.CustomPaymentForm
    },
    {
      id: 2,
      name: 'AdyenExternalPaymentProvider',
      provider: Provider.CustomPaymentForm
    }];
  }
};

export default usePaymentFactory<PaymentProvider>(factoryParams);
