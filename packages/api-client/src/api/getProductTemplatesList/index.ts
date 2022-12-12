/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductTemplateListQuery';
import { GraphQlGetProductParams, ProductResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';
import { randomIntegerBetween } from '../../';
export default async function getProductTemplatesList(
  context: Context,
  params: GraphQlGetProductParams,
  customQuery?: CustomQuery,
  cacheKey?: string,
  categoryIdForCache?: string
): Promise<FetchResult<ProductResult>> {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo as ApolloClient<any>;

  let cachedProducts = null;
  if (cacheKey && redisClient && (cachedProducts = await redisClient.get(cacheKey))) {
    return cachedProducts;
  }

  const { getProductTemplatesList } = context.extendQuery(
    customQuery, { getProductTemplatesList: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getProductTemplatesList.query}`,
    variables: getProductTemplatesList.variables,
    errorPolicy: 'all'
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient && response.data?.products) {
    redisClient.set(
      cacheKey,
      response,
      [`API-C${categoryIdForCache}-products`],
      process.env.REDIS_TTL_CACHE_MAXIMUM ? randomIntegerBetween(Number(process.env.REDIS_TTL_CACHE_MINIMUM), Number(process.env.REDIS_TTL_CACHE_MAXIMUM)) : 86400
    );
  }

  return response;
}
