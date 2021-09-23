/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomQuery,
  Context,
  FactoryParams,
  PlatformApi,
  ComputedProperty,
  Composable
} from '@vue-storefront/core';

export interface usePayMentProviderErrors {
  getPaymentMethods: Error;
  getPaymentExternalUrl: Error;
}

export interface UsePaymentProvider< PAYMENT_PROVIDER, PAYMENT_METHOD, API extends PlatformApi = any> extends Composable<API> {
  getPaymentMethods(cart: PAYMENT_PROVIDER): PAYMENT_METHOD[];
  getPaymentExternalUrl(params: { customQuery?: CustomQuery }): string;

  error: ComputedProperty<usePayMentProviderErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UsePaymentProviderParams< PAYMENT_PROVIDER, PAYMENT_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {

  getPaymentMethods: (context: Context, params: { customQuery?: any; }) => PAYMENT_METHOD[];

  getPaymentExternalUrl: (context: Context, params: { customQuery?: CustomQuery; }) => string;
}
export declare const usePaymentProviderFactory: < PAYMENT_PROVIDER, PAYMENT_METHOD, API extends PlatformApi = any>(
  factoryParams: UsePaymentProviderParams<PAYMENT_PROVIDER, PAYMENT_METHOD, API>
) => () => UsePaymentProvider<PAYMENT_PROVIDER, PAYMENT_METHOD, API>;
