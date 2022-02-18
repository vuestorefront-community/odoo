import { Ref, computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef
} from '@vue-storefront/core';
import { Composable, ComputedProperty, PlatformApi } from '@vue-storefront/core/lib/src/types';

export interface UseNewsletterErrors {
  sendSubscription: Error;
  }

export interface UseNewsletter<SEND_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API> {
    error: ComputedProperty<UseNewsletterErrors>;
    loading: ComputedProperty<boolean>;
    sendSubscription: (params: ComposableFunctionArgs<{ email: SEND_NEWSLETTER_PARAMS }>) => Promise<void>;
  }

export interface UseNewsletterFactoryParams<NEWSLETTER, SEND_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  sendSubscription: (context: Context, params: ComposableFunctionArgs<{ email: SEND_NEWSLETTER_PARAMS }>) => Promise<NEWSLETTER>;
}

export const useNewsletterFactory = <NEWSLETTER, SEND_NEWSLETTER_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseNewsletterFactoryParams<NEWSLETTER, SEND_NEWSLETTER_PARAMS, API>
) => function useNewsletter(): UseNewsletter<SEND_NEWSLETTER_PARAMS, API> {
    const errorsFactory = (): UseNewsletterErrors => ({
      sendSubscription: null
    });

    const loading: Ref<boolean> = sharedRef(false, 'useNewsletter-loading');
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseNewsletterErrors> = sharedRef(errorsFactory(), 'useNewsletter-error');

    const resetErrorValue = () => {
      error.value = errorsFactory();
    };

    const sendSubscription = async (params: ComposableFunctionArgs<{ email: SEND_NEWSLETTER_PARAMS }>) => {
      Logger.debug('useNewsletterFactory.sendSubscription', params);
      resetErrorValue();

      try {
        loading.value = true;
        error.value.sendSubscription = null;
        console.log(await _factoryParams.sendSubscription(params));

        return await _factoryParams.sendSubscription(params);
      } catch (err) {
        error.value.sendSubscription = err;
        Logger.error('useNewsletter/sendSubscription', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      error: computed(() => error.value),
      loading: computed(() => loading.value),
      sendSubscription
    };
  };
