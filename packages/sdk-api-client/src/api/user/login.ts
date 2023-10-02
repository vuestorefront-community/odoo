import { CustomQuery } from '@vue-storefront/middleware';
import { MutationLoginArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './loginUserMutation';

export const loginUser: Endpoints['loginUser'] = async (context: OdooIntegrationContext, params: MutationLoginArgs, customQuery?: CustomQuery) => {
  
  const { loginUser } = context.extendQuery(
    customQuery, { loginUser: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: loginUser.variables,
    mutation: loginUser.mutation,
  });

  return response;
};


