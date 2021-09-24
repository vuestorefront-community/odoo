/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, FactoryParams, PlatformApi, Composable, CustomQuery,
  configureFactoryParams, sharedRef, ComputedProperty, Logger} from '@vue-storefront/core';
import { computed, Ref } from '@vue/composition-api';
export interface UsePaymentErrors { getPaymentProviderList: Error;}

export interface UsePayment<PAYMENT_PROVIDER, API extends PlatformApi = any>
  extends Composable<API> {
  error: ComputedProperty<UsePaymentErrors>;
  loading: ComputedProperty<boolean>;
  providerList: Ref<PAYMENT_PROVIDER[]>;

  getPaymentProviderList(
    providerList: PAYMENT_PROVIDER
  ): Promise<PAYMENT_PROVIDER[]>;
}

export interface UsePaymentFactoryParams< PAYMENT_PROVIDER, API extends PlatformApi = any> extends FactoryParams<API> {

  getPaymentProviderList: (context: Context, params: { customQuery?: CustomQuery; }) => Promise<PAYMENT_PROVIDER[]>;
}

export const usePaymentFactory = < PAYMENT_PROVIDER, API extends PlatformApi = any>(
  factoryParams: UsePaymentFactoryParams<PAYMENT_PROVIDER, API>) =>

    function usePayment(id: string): UsePayment<PAYMENT_PROVIDER, API> {

      const ssrKey = id || 'usePayment';
      const _factoryParams = configureFactoryParams(factoryParams);

      const providerList = sharedRef(null, `${ssrKey}-providerList`);
      const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
      const error = sharedRef<UsePaymentErrors>(
        { getPaymentProviderList: null },
        `${ssrKey}-error`
      );

      const getPaymentProviderList = async (): Promise<PAYMENT_PROVIDER[]> => {
        try {
          const response = await _factoryParams.getPaymentProviderList();

          providerList.value = response;

          return response;
        } catch (error) {
          error.value.Logger.error(
            `UsePayment/${id}/getPaymentProviderList`,
            error
          );
        }
      };

      return {
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        providerList,
        getPaymentProviderList
      };
    };
