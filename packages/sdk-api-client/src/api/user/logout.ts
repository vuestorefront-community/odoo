import { CustomQuery } from '@vue-storefront/middleware';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './logoutUserMutation';

export const logoutUser: Endpoints['logoutUser'] = async (context: OdooIntegrationContext, customQuery?: CustomQuery) => {
  
  const { logoutUser } = context.extendQuery(
    customQuery, { logoutUser: { mutation } }
  );

  const response = await context.client.mutate({
    mutation: logoutUser.mutation,
  });

  return response;
};
