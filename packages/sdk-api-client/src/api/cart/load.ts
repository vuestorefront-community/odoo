
import { CustomQuery } from '@vue-storefront/middleware';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './loadQuery';

export const cartLoad: Endpoints['cartLoad'] = async (context: OdooIntegrationContext, customQuery?: CustomQuery) => {
  
  const { cartLoad } = context.extendQuery(
    customQuery, { cartLoad: { query } }
  );

  const response = await context.client.query({
    query: cartLoad.query,
  });

  return response;
};
