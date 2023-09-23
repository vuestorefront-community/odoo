import { CustomQuery } from '@vue-storefront/middleware';
import { MutationRegisterArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './signUpUserMutation';

export const signUpUser: Endpoints['signUpUser'] = async (context: OdooIntegrationContext, params: MutationRegisterArgs, customQuery?: CustomQuery) => {
  
  const { register } = context.extendQuery(
    customQuery, { register: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: register.variables,
    mutation: register.mutation,
  });

  return response;
};


