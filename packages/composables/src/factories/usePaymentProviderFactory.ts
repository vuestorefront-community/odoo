/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery, Context, FactoryParams, PlatformApi, ComputedProperty, Composable, configureFactoryParams, sharedRef, Logger} from '@vue-storefront/core';
import { GraphQlMakePaymentParams, PaymentProvider } from '@vue-storefront/odoo-api';
import { computed, Ref } from '@nuxtjs/composition-api';

export interface usePaymentProviderErrors {
  getPaymentMethods: Error;
  getPaymentExternal: Error;
}

export interface UsePaymentProvider< PAYMENT_PROVIDER, PAYMENT_METHOD, PAYMENT_METHOD_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  getPaymentMethods(cart: PAYMENT_PROVIDER): PAYMENT_METHOD[];
  getPaymentExternal(params: { params: PAYMENT_METHOD_PARAMS, customQuery?: CustomQuery }): Promise<string>;

  paymentExternalResponse: Ref<any>;

  error: ComputedProperty<usePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UsePaymentProviderParams< PAYMENT_PROVIDER, PAYMENT_METHOD, PAYMENT_METHOD_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {

  getPaymentMethods: (context: Context, params: { customQuery?: any; }) => PAYMENT_METHOD[];

  getPaymentExternal: (context: Context, params: { params: PAYMENT_METHOD_PARAMS, customQuery?: CustomQuery; }) => Promise<string>;
}

export const usePaymentProviderFactory = <PAYMENT_PROVIDER, PAYMENT_METHOD, PAYMENT_METHOD_PARAMS, API extends PlatformApi = any>(
  factoryParams: UsePaymentProviderParams<PAYMENT_PROVIDER, PAYMENT_METHOD, PAYMENT_METHOD_PARAMS, API>

) => function UsePaymentProvider(provider: PaymentProvider): UsePaymentProvider<PAYMENT_PROVIDER, PAYMENT_METHOD, PAYMENT_METHOD_PARAMS, API> {
    const _factoryParams = configureFactoryParams(factoryParams);
    const ssrKey = provider.id || 'usePaymentProvider';

    const paymentExternalResponse = sharedRef(null, `${ssrKey}-provider`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
    const error = sharedRef<usePaymentProviderErrors>({ getPaymentMethods: null, getPaymentExternal: null }, `${ssrKey}-error`);

    const getPaymentMethods = _factoryParams.getPaymentMethods;

    const getPaymentExternal = async (): Promise<string> => {
      try {
        const params: GraphQlMakePaymentParams = {
          paymentAcquireId: provider.id
        };

        const response = await _factoryParams.getPaymentExternal({ params });

        paymentExternalResponse.value = response;

        return response;

      } catch (err) {
        error.value.getPaymentExternal = err;
        Logger.error(`UsePayment/${ssrKey}/getPaymentExternal`, err);
      }
    };

    return {
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      getPaymentMethods,
      getPaymentExternal,
      paymentExternalResponse
    };
  };

