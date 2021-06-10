import { CustomQuery } from '@vue-storefront/core';
import mutation from './signUpUserMutation';
import ApolloClient from 'apollo-client';
import { AgnosticUser } from '@vue-storefront/odoo-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function signUpUser(context, user: AgnosticUser, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;
  const response = await apolloClient.mutate({
    mutation,
    variables: user
  });

  return response;

}
