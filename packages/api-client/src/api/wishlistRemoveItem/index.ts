/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ApolloClient from 'apollo-client';
import mutation from './wishlistRemoveItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { Product } from '../../types';
import { GraphQlWishlistRemoveItemParams } from '../../types';

export default async function wishlistRemoveItem(
  context: Context,
  params: GraphQlWishlistRemoveItemParams,
  customQuery?: CustomQuery
): Promise<any> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
