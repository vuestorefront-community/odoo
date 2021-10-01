/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApolloClient from 'apollo-client';
import mutation from './wishlistRemoveItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { GraphQlWishlistRemoveItemParams } from '../../index';
import { FetchResult } from 'apollo-link';

export default async function wishlistRemoveItem(
  context: Context,
  params: GraphQlWishlistRemoveItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
