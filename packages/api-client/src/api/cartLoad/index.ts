/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import query from './cartLoadQuery';
import ApolloClient from 'apollo-client';
import { SaleOrder } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function cartLoad(
  context: Context,
  params: Record<string, string>,
  customQuery?: CustomQuery
): Promise<FetchResult<SaleOrder>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query
  });

  return response;
}
