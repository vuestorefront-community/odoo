/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartRemoveItemParams } from '../../index';
import mutation from './cartRemoveItemMutation';

export default async function cartRemoveItem(
  context: Context,
  params: GraphQlCartRemoveItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;
  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
