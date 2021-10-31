/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlUpdateAccountParams, UpdateAccountResult } from '../../index';
import mutation from './updateAccountMutation';

export default async function updateAccount(
  context: Context,
  params: GraphQlUpdateAccountParams,
  customQuery?: CustomQuery
): Promise<FetchResult<UpdateAccountResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { updateAccount } = context.extendQuery(
    customQuery, { updateAccount: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: updateAccount.mutation,
    variables: updateAccount.params,
    fetchPolicy: 'no-cache'
  });

  return response;

}
