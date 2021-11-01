/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import query from './shippingGetAddressQuery';
export default async function getAddresses(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getAddresses } = context.extendQuery(
    customQuery, { getAddresses: { query } }
  );

  return await apolloClient.query({
    query: gql`${getAddresses.query}`
  });

}
