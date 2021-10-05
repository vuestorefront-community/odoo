/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './signUpUserMutation';
import ApolloClient from 'apollo-client';
import { RegisterResult, Partner } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function signUpUser(
  context: Context,
  params: Partner,
  customQuery?: CustomQuery
): Promise<FetchResult<RegisterResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  return await apolloClient.mutate({
    mutation,
    variables: params,
    fetchPolicy: 'no-cache'
  });
}
