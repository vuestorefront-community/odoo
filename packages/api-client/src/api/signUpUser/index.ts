/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './signUpUserMutation';
import ApolloClient from 'apollo-client';
import { AgnosticUser } from '@vue-storefront/odoo-api/src/types';
import { DefaultGraphQlMutationResponse } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function signUpUser(
  context: Context,
  user: AgnosticUser,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;
  const response = await apolloClient.mutate({
    mutation,
    variables: user
  });

  return response;
}
