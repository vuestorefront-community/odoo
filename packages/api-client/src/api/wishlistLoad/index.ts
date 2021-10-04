/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import query from './wishlistLoadQuery';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { WishListLoadResponse } from '../../index';

export default async function wishlistLoad(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<WishListLoadResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query
  });

  return response;
}
