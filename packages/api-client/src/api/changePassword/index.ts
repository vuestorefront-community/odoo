/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './changePasswordMutation';
import ApolloClient from 'apollo-client';
import {
  DefaultGraphQlMutationResponse,
  GraphQlResetPasswordParams
} from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function changePassword(
  context: Context,
  params: GraphQlResetPasswordParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response;
}
