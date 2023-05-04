/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import { CategoriesResult, GraphQlGetCategoriesParams } from '../../index';
import query from './getCategoriesQuery';
import { randomIntegerBetween } from '../../';

export default async function getCategories(
  context: Context,
  params: GraphQlGetCategoriesParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CategoriesResult>> {
  const redisClient = context.client.redisTagClient;
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const cacheKey = 'API-C-ALL-CATEGORIES';
  let cachedCategories = null;

  if (redisClient && (cachedCategories = await redisClient.get(cacheKey))) {
    return cachedCategories;
  }

  const { getCategories } = context.extendQuery(
    customQuery, { getCategories: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getCategories.query}`,
    variables: getCategories.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });

  delete response?.data?.cookie;
  if (redisClient && response.data?.categories?.categories) {
    redisClient.set(
      cacheKey,
      response,
      [cacheKey],
      { timeout: process.env.REDIS_TTL_CACHE_MAXIMUM ? randomIntegerBetween(Number(process.env.REDIS_TTL_CACHE_MINIMUM), Number(process.env.REDIS_TTL_CACHE_MAXIMUM)) : 86400 }
    );
  }

  return response;
}
