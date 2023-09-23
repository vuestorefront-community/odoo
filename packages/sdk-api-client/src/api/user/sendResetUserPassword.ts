import { CustomQuery } from '@vue-storefront/middleware';
import { MutationResetPasswordArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './sendResetUserPasswordMutation';

export const sendResetUserPassword: Endpoints['sendResetUserPassword'] = async (context: OdooIntegrationContext, params: MutationResetPasswordArgs, customQuery?: CustomQuery) => {
  
  const { sendResetUserPassword } = context.extendQuery(
    customQuery, { sendResetUserPassword: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: sendResetUserPassword.variables,
    mutation: sendResetUserPassword.mutation,
  });

  return response;
};



