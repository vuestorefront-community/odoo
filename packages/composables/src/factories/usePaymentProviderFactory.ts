/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery, Context, FactoryParams, PlatformApi, ComputedProperty, Composable, configureFactoryParams, sharedRef} from '@vue-storefront/core';
import { computed, Ref } from '@vue/composition-api';

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

export const usePaymentProviderFactory = <PAYMENT_PROVIDER, PAYMENT_METHOD, API extends PlatformApi = any>(
  factoryParams: UsePaymentProviderParams<PAYMENT_PROVIDER, PAYMENT_METHOD, API>
) => function UsePaymentProvider(): UsePaymentProvider<PAYMENT_PROVIDER, PAYMENT_METHOD, API> {
    const _factoryParams = configureFactoryParams(factoryParams);

    const loading: Ref<boolean> = sharedRef(false, 'loading');
    const error: Ref<usePayMentProviderErrors> = sharedRef({}, 'error');

    const getPaymentMethods = _factoryParams.getPaymentMethods;
    const getPaymentExternalUrl = _factoryParams.getPaymentExternalUrl;

    return {
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      getPaymentMethods,
      getPaymentExternalUrl
    };
  };

