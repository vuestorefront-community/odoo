/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import {
  usePaymentProviderFactory,
  UsePaymentProviderParams
} from '../../factories/usePaymentProviderFactory';
import { PaymentProvider } from '@vue-storefront/odoo-api/src/types';

declare type PaymentMethods = {
  name: string;
};

const factoryParams: UsePaymentProviderParams<PaymentProvider, any> = {
  getPaymentMethods: (context: Context, params): PaymentMethods[] => {
    console.log('implement');

    return [] as PaymentMethods[];
  },
  getPaymentExternalUrl: (context: Context, params): string => {
    console.log('implement');

    return '';
  }
};

export default usePaymentProviderFactory<PaymentProvider, PaymentMethods>(
  factoryParams
);
