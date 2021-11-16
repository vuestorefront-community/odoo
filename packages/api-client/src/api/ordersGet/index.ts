/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import query from './ordersGetQuery';
import { GraphQlOrdersParams, OrdersResponse } from '../../index';
export default async function ordersGet(
  context: Context,
  params: GraphQlOrdersParams,
  customQuery?: CustomQuery
): Promise<FetchResult<OrdersResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { ordersGet } = context.extendQuery(
    customQuery, { ordersGet: { query, variables: params } }
  );

  return await apolloClient.query({
    query: gql`${ordersGet.query}`,
    variables: ordersGet.variables,
    fetchPolicy: 'no-cache'
  });

}
