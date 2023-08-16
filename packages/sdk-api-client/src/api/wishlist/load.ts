
import { CustomQuery } from '@vue-storefront/middleware';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './loadQuery';

export const wishlistLoad: Endpoints['wishlistLoad'] = async (context: OdooIntegrationContext, customQuery?: CustomQuery) => {
  
  const { wishlistLoad } = context.extendQuery(
    customQuery, { wishlistLoad: { query } }
  );

  const response = await context.client.query({
    query: wishlistLoad.query,
  });

  return response;
};
