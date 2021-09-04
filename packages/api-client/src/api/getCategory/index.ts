/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import query from './getCategoryQuery';
import { CategoryResult, GraphQlGetCategoryParams } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function getCategory(
  context: Context,
  params: GraphQlGetCategoryParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CategoryResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    fetchPolicy: 'no-cache',
    variables: params
  });

  return response.data;
}
