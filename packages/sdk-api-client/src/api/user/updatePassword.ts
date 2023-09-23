import { CustomQuery } from '@vue-storefront/middleware';
import { MutationUpdatePasswordArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './changeUserPasswordMutation';

export const updatePassword: Endpoints['updatePassword'] = async (context: OdooIntegrationContext, params: MutationUpdatePasswordArgs, customQuery?: CustomQuery) => {
  
  const { updatePassword } = context.extendQuery(
    customQuery, { updatePassword: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: updatePassword.variables,
    mutation: updatePassword.mutation,
  });

  return response;
};


