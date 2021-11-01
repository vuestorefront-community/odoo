/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { BillingGetAddressResult } from '../..';
import query from './billingGetAddressQuery';
export default async function billingGetAddress(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<BillingGetAddressResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { billingGetAddress } = context.extendQuery(
    customQuery, { billingGetAddress: { query } }
  );

  return await apolloClient.query({
    query: gql`${billingGetAddress.query}`
  });
}
