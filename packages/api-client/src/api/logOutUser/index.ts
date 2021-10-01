/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './logOutUserMutation';
import { FetchResult } from 'apollo-link/lib/types';
import ApolloClient from 'apollo-client';
import { Partner } from '../../types';

export default async function logOutUser(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<Partner>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation
  });

  return response;
}
