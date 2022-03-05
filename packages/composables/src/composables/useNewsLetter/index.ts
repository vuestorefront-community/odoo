import { Context, Logger} from '@vue-storefront/core';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsLetterFactory';

const factoryParams: UseNewsletterFactoryParams<any, string> = {

  sendSubscription: async (context: Context, params) => {
    Logger.debug('[Odoo]: Update user newsletter subscription', { params });

    const { data } = await context.$odoo.api.subscribeNewsLetter(
      {
        email: params.email
      }
    );

    return data.newsletterSubscribe;
  }
};

export default useNewsletterFactory<any, string>(factoryParams);
