/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './signUpUserMutation';
import ApolloClient from 'apollo-client';
import { User } from '@vue-storefront/odoo-api/src/types';
import { DefaultGraphQlMutationResponse } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function signUpUser(
  context: Context,
  params: User,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
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
