import { CustomQuery } from '@vue-storefront/middleware';
import { UpdateMyAccountParams } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './updateUserMutation';

export const updateMyAccount: Endpoints['updateMyAccount'] = async (context: OdooIntegrationContext, params: UpdateMyAccountParams, customQuery?: CustomQuery) => {
  
  const { updateMyAccount } = context.extendQuery(
    customQuery, { updateMyAccount: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: updateMyAccount.variables,
    mutation: updateMyAccount.mutation,
  });

  return response;
};


