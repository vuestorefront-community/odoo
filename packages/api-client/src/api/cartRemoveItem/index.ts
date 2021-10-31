/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartRemoveItemParams, CartRemoveItemResult } from '../../index';
import mutation from './cartRemoveItemMutation';

export default async function cartRemoveItem(
  context: Context,
  params: GraphQlCartRemoveItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CartRemoveItemResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { cartRemoveItem } = context.extendQuery(
    customQuery, { cartRemoveItem: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: cartRemoveItem.mutation,
    variables: cartRemoveItem.params
  });

  return response;
}
