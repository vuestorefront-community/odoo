/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import mutation from './logInMutation';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlLoginParams } from '../../index';

export default async function logInUser(
  context: Context,
  params: GraphQlLoginParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  try {
    const response = await apolloClient.mutate({
      mutation,
      variables: params,
      fetchPolicy: 'no-cache'
    });

    return response.data;
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
