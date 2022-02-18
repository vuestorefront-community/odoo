import {
  Context, Logger
} from '@vue-storefront/core';
import useUser from '../useUser';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsLetterFactory';

const factoryParams: UseNewsletterFactoryParams<any, string> = {
  provide() {
    return {
      user: useUser()
    };
  },
  sendSubscription: async (context: Context, params) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { params });

    const { data } = await context.$odoo.api.subscribeNewsLetter(
      {
        email: params.email
      }
    );

    return data.newsletterSubscribe;
  }
};

export default useNewsletterFactory<any, string>(factoryParams);
