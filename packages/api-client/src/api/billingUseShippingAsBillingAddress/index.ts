/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './billingUseShippingAsBillingAddress';
import ApolloClient from 'apollo-client';
import { DefaultGraphQlMutationResponse } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function billingUseShippingAsBillingAddress(
  context: Context,
  params: Record<string, string>,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation
  });

  return response;
}
