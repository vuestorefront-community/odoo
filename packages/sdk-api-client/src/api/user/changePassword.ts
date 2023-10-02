import { CustomQuery } from '@vue-storefront/middleware';
import { MutationChangePasswordArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './changeUserPasswordMutation';

export const changePassword: Endpoints['changePassword'] = async (context: OdooIntegrationContext, params: MutationChangePasswordArgs, customQuery?: CustomQuery) => {
  
  const { changePassword } = context.extendQuery(
    customQuery, { changePassword: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: changePassword.variables,
    mutation: changePassword.mutation,
  });

  return response;
};


