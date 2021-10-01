/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './loadUserQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { LoadUserResult } from '../../types';
export default async function loadUser(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<LoadUserResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  try {
    const response = await apolloClient.query({
      query,
      fetchPolicy: 'no-cache'
    });

    return response;
  } catch (error) {
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null
      };
    }
    throw error.networkError?.result || error;
  }
}
