/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlMakePaymentParams } from '../../types';
import mutation from './paymentMakeExternalMutation';
import ApolloClient from 'apollo-client';

export default async function paymentMakeExternalMutation(
  context: Context,
  params: GraphQlMakePaymentParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
