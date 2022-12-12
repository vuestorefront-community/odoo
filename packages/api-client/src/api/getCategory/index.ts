/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getCategoryQuery';
import { CategoryResult, GraphQlGetCategoryParams } from '../../index';
import { FetchResult } from 'apollo-link';
import { randomIntegerBetween } from '../../';

export default async function getCategory(
  context: Context,
  params: GraphQlGetCategoryParams,
  customQuery?: CustomQuery,
  cacheKey?: string
): Promise<FetchResult<CategoryResult>> {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo as ApolloClient<any>;

  let cachedCategory = null;
  if (cacheKey && redisClient && (cachedCategory = await redisClient.get(cacheKey))) {
    return cachedCategory;
  }

  const { getCategory } = context.extendQuery(
    customQuery, { getCategory: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getCategory.query}`,
    variables: getCategory.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });

  delete response?.data?.cookie;
  if (cacheKey && redisClient) {
    redisClient.set(
      cacheKey,
      response,
      [`API-C${response.data.category.id}`],
      process.env.REDIS_TTL_CACHE_MAXIMUM ? randomIntegerBetween(Number(process.env.REDIS_TTL_CACHE_MINIMUM), Number(process.env.REDIS_TTL_CACHE_MAXIMUM)) : 86400
    );
  }

  return response;
}
