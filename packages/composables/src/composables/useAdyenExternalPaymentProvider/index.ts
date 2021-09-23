/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import {
  usePaymentProviderFactory,
  UsePaymentProviderParams
} from '../../factories/usePaymentProviderFactory';
import { PaymentProvider, PaymentMethod } from '@vue-storefront/odoo-api/src/types';

const factoryParams: UsePaymentProviderParams<PaymentProvider, any> = {
  getPaymentMethods: (context: Context, params): PaymentMethod[] => {
    console.log('implement');

    return [] as PaymentMethod[];
  },
  getPaymentExternalUrl: (context: Context, params): string => {
    console.log('implement');

    return '';
  }
};

export default usePaymentProviderFactory<PaymentProvider, PaymentMethod>(factoryParams);
