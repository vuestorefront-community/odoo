/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */

import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getRealProductQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductVariantParams, ProductVariantResult } from '../../index';

export default async function getRealProduct(
  context: Context,
  params: GraphQlGetProductVariantParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ProductVariantResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getRealProduct } = context.extendQuery(
    customQuery, { getRealProduct: { query, variables: params } }
  );

  try {
    const response = await apolloClient.query({
      query: getRealProduct.query,
      variables: getRealProduct.params,
      fetchPolicy: 'no-cache'
    });

    return response;
  } catch (error) {
    if (error.graphQLErrors) {
      return {
        errors: error.graphQLErrors,
        data: null
      };
    }
    throw error.networkError?.result || error;
  }
}
