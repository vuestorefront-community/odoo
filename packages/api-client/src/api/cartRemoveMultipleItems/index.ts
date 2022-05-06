/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import mutation from './cartRemoveMultipleItemsMutation';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlRemoveMultipleProductsParams, cartRemoveMultipleItemsResult } from '../../index';

export default async function cartRemoveMultipleItems(
  context: Context,
  params: GraphQlRemoveMultipleProductsParams,
  customQuery?: CustomQuery
): Promise<FetchResult<cartRemoveMultipleItemsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { cartRemoveMultipleItems } = context.extendQuery(
    customQuery, { cartRemoveMultipleItems: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${cartRemoveMultipleItems.mutation}`,
    variables: cartRemoveMultipleItems.variables
  });

  return response;
}
