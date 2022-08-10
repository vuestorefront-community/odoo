/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import { CategoriesResult, GraphQlGetCategoriesParams } from '../../index';
import query from './getCategoriesQuery';

export default async function getCategories(
  context: Context,
  params: GraphQlGetCategoriesParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CategoriesResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getCategories } = context.extendQuery(
    customQuery, { getCategories: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getCategories.query}`,
    variables: getCategories.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });

  return response;
}
