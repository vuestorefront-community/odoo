/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApolloClient from 'apollo-client';
import mutation from './wishlistAddItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlWishlistAddItemParams, WishlistAddItemResponse } from '../../index';

export default async function wishlistAddItem(
  context: Context,
  params: GraphQlWishlistAddItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult<WishlistAddItemResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response;
}
