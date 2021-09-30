/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import query from './shippingGetDeliveryMethodsQuery';

export default async function shippingGetDeliveryMethods(
  context: Context,
  params: Record<string, string>,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query
  });

  return response.data;
}
