/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import mutation from './cartAddItemMutation';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartAddItemParams } from '../../types';

export default async function cartAddItem(
  context: Context,
  params: GraphQlCartAddItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;
  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
