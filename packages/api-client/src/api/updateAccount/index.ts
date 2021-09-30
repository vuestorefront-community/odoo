/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlUpdateAccountParams } from '../../types';
import mutation from './updateAccountMutation';

export default async function updateAccount(
  context: Context,
  params: GraphQlUpdateAccountParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params,
    fetchPolicy: 'no-cache'
  });

  return response.data;

}
