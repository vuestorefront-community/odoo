/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getCategoryQuery';
import { CategoryResult, GraphQlGetCategoryParams } from '../../index';
import { FetchResult } from 'apollo-link';

export default async function getCategory(
  context: Context,
  params: GraphQlGetCategoryParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CategoryResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getCategory } = context.extendQuery(
    customQuery, { getCategory: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getCategory.query}`,
    variables: getCategory.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });

  return response;
}
