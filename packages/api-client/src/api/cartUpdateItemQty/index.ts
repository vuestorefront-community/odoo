/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import mutation from './cartUpdateItemQtyMutation';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartUpdateItemQtyParams, CartUpdateItemQtyResponse } from '../../index';

export default async function cartUpdateItemQty(
  context: Context,
  params: GraphQlCartUpdateItemQtyParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CartUpdateItemQtyResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: params
  });

  return response.data;
}
