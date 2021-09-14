/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */

import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getRealProductQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductVariantParams } from '../../types';

export default async function getProduct(
  context: Context,
  params: GraphQlGetProductVariantParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: params
  });

  return response.data;
}
