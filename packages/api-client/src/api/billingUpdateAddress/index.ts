/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './billingUpdateAddressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlUpdateAddressParams, BillingUpdateAddressResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function billingUpdateAddress(
  context: Context,
  billingAddressParams: GraphQlUpdateAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<BillingUpdateAddressResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { billingAddress } = context.extendQuery(
    customQuery, { billingAddress: { mutation, variables: billingAddressParams } }
  );

  const response = await apolloClient.mutate({
    mutation: billingAddress.mutation,
    variables: billingAddress.variables
  });

  return response;
}
