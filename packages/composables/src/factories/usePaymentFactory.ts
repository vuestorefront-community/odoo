/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, FactoryParams, PlatformApi, Composable, CustomQuery, configureFactoryParams} from '@vue-storefront/core';
export interface UsePaymentErrors {
  getPaymentProviderList: Error;
}

export interface UsePayment<PAYMENT_PROVIDER, API extends PlatformApi = any> extends Composable<API> {
  getPaymentProviderList(providerList: PAYMENT_PROVIDER): PAYMENT_PROVIDER[];
}

export interface UsePaymentFactoryParams< PAYMENT_PROVIDER, API extends PlatformApi = any> extends FactoryParams<API> {
  getPaymentProviderList: (context: Context, params: {
     customQuery?: CustomQuery;
    }) => PAYMENT_PROVIDER[];
}

export const usePaymentFactory = <PAYMENT_PROVIDER, API extends PlatformApi = any>(
  factoryParams: UsePaymentFactoryParams<PAYMENT_PROVIDER, API>
) => function usePayment(): UsePayment<PAYMENT_PROVIDER, API> {
    const _factoryParams = configureFactoryParams(factoryParams);

    const getPaymentProviderList = _factoryParams.getPaymentProviderList;

    return {
      getPaymentProviderList
    };
  };

