/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './sendResetPasswordMutation';
import ApolloClient from 'apollo-client';
import {
  DefaultGraphQlMutationResponse,
  GraphQlSendResetPasswordParams
} from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function sendResetPassword(
  context: Context,
  params: GraphQlSendResetPasswordParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response;
}
