/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, FactoryParams, PlatformApi, Composable, CustomQuery,
  configureFactoryParams, sharedRef, ComputedProperty, Logger} from '@vue-storefront/core';
import { computed, Ref } from '@nuxtjs/composition-api';

export interface UsePaymentErrors {
   getPaymentProviderList: Error;
   getPaymentConfirmation: Error;
  }
export interface UsePayment<PAYMENT_PROVIDER, PAYMENT_RESPONSE, API extends PlatformApi = any>
  extends Composable<API> {
  error: ComputedProperty<UsePaymentErrors>;
  loading: ComputedProperty<boolean>;
  providerList: Ref<PAYMENT_PROVIDER[]>;

  getPaymentProviderList(
    providerList: PAYMENT_PROVIDER
  ): Promise<PAYMENT_PROVIDER[]>;

  getPaymentConfirmation(): Promise<PAYMENT_RESPONSE>;
}

export interface UsePaymentFactoryParams< PAYMENT_PROVIDER, PAYMENT_RESPONSE, API extends PlatformApi = any> extends FactoryParams<API> {

  getPaymentProviderList: (context: Context, params: { customQuery?: CustomQuery; }) => Promise<PAYMENT_PROVIDER[]>;
  getPaymentConfirmation: (context: Context, params: { customQuery?: CustomQuery; }) => Promise<PAYMENT_RESPONSE>;
}

export const usePaymentFactory = < PAYMENT_PROVIDER, PAYMENT_RESPONSE, API extends PlatformApi = any>(
  factoryParams: UsePaymentFactoryParams<PAYMENT_PROVIDER, API>) =>

    function usePayment(id: string): UsePayment<PAYMENT_PROVIDER, PAYMENT_RESPONSE, API> {

      const ssrKey = id || 'usePayment';
      const _factoryParams = configureFactoryParams(factoryParams);

      const providerList = sharedRef(null, `${ssrKey}-providerList`);
      const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
      const error = sharedRef<UsePaymentErrors>(
        {
          getPaymentProviderList: null,
          getPaymentConfirmation: null
        },
        `${ssrKey}-error`
      );

      const getPaymentProviderList = async (params): Promise<PAYMENT_PROVIDER[]> => {
        try {
          loading.value = true;
          const response = await _factoryParams.getPaymentProviderList(params);

          providerList.value = response;

          return response;
        } catch (err) {
          error.value.getPaymentProviderList = err;
          Logger.error(`UsePayment/${id}/getPaymentProviderList`, err);
        } finally {
          loading.value = false;
        }
      };

      const getPaymentConfirmation = async (): Promise<PAYMENT_RESPONSE> => {

        try {
          loading.value = true;
          const response = await _factoryParams.getPaymentConfirmation();

          return response;
        } catch (err) {
          error.value.getPaymentConfirmation = err;
          Logger.error(`UsePayment/${id}/getPaymentConfirmation`, err);
        } finally {
          loading.value = false;
        }
      };

      return {
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        providerList,
        getPaymentProviderList,
        getPaymentConfirmation
      };
    };
