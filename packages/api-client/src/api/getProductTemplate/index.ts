/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductTemplateQuery';
import { GraphQlGetProductTemplateParams, SingleProductResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';
import { randomIntegerBetween } from '../../';

export default async function getProductTemplate(
  context: Context,
  params: GraphQlGetProductTemplateParams,
  customQuery?: CustomQuery,
  cacheKey?: string
): Promise<FetchResult<SingleProductResult>> {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo as ApolloClient<any>;

  let cachedProduct = null;
  if (cacheKey && redisClient && (cachedProduct = await redisClient.get(cacheKey))) {
    return cachedProduct;
  }

  const { getProductTemplate } = context.extendQuery(
    customQuery, { getProductTemplate: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getProductTemplate.query}`,
    variables: getProductTemplate.variables,
    errorPolicy: 'all'
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient) {
    redisClient.set(
      cacheKey,
      response,
      [`API-P${response.data.product.id}`],
      process.env.REDIS_TTL_CACHE_MAXIMUM ? randomIntegerBetween(Number(process.env.REDIS_TTL_CACHE_MINIMUM), Number(process.env.REDIS_TTL_CACHE_MAXIMUM)) : 86400
    );
  }

  return response;
}
