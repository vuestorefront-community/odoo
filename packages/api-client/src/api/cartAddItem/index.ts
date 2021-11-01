/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import mutation from './cartAddItemMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartAddItemParams, CartAddItemResult } from '../../index';

export default async function cartAddItem(
  context: Context,
  params: GraphQlCartAddItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CartAddItemResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { cartAddItems } = context.extendQuery(
    customQuery, { cartAddItems: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${cartAddItems.mutation}`,
    variables: cartAddItems.variables
  });

  return response;
}
