
import { CustomQuery } from '@vue-storefront/middleware';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './loadQuery';

export const loadUser: Endpoints['loadUser'] = async (context: OdooIntegrationContext, customQuery?: CustomQuery) => {
  
  const { loadUser } = context.extendQuery(
    customQuery, { loadUser: { query } }
  );

  const response = await context.client.query({
    query: loadUser.query,
  });

  return response;
};
