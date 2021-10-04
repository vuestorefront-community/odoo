/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from '@vue-storefront/core';
import {
  usePaymentProviderFactory,
  UsePaymentProviderParams
} from '../../factories/usePaymentProviderFactory';
import { PaymentProvider, PaymentMethod } from '@vue-storefront/odoo-api';

const factoryParams: UsePaymentProviderParams<PaymentProvider, any> = {

  getPaymentMethods: (context: Context, params): PaymentMethod[] => {
    console.log('implement getPaymentMethods');

    return [] as PaymentMethod[];
  },
  getPaymentExternal: async (context: Context, params): Promise<string> => {

    const { data } = await context.$odoo.api.paymentMakeExternal(params);
    return data?.makePayment.form;
  }
};

export default usePaymentProviderFactory<PaymentProvider, PaymentMethod>(factoryParams);
