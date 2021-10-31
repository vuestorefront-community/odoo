/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApolloClient from 'apollo-client';
import mutation from './wishlistRemoveItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { GraphQlWishlistRemoveItemParams, WishlistRemoveItemResponse } from '../../index';
import { FetchResult } from 'apollo-link';

export default async function wishlistRemoveItem(
  context: Context,
  params: GraphQlWishlistRemoveItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult<WishlistRemoveItemResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { wishlistRemoveItem } = context.extendQuery(
    customQuery, { wishlistRemoveItem: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: wishlistRemoveItem.mutation,
    variables: wishlistRemoveItem.params
  });

  return response;
}
