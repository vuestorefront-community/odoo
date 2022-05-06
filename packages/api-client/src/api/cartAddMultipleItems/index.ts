/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import mutation from './cartAddMultipleItemsMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAddMultipleProductsParams, cartAddMultipleItemsResult } from '../../index';

export default async function cartAddMultipleItems(
  context: Context,
  params: GraphQlAddMultipleProductsParams,
  customQuery?: CustomQuery
): Promise<FetchResult<cartAddMultipleItemsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { cartAddMultipleItems } = context.extendQuery(
    customQuery, { cartAddMultipleItems: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${cartAddMultipleItems.mutation}`,
    variables: cartAddMultipleItems.variables
  });

  return response;
}
