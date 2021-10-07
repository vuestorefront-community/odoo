/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './billingAddAddressQuery';
import ApolloClient from 'apollo-client';
import { GraphQlAddAddressParams, DefaultGraphQlMutationResponse, BillingAddAddresResponse } from '../../index';
import { FetchResult } from 'apollo-link';

export default async function billingAddAddress(
  context: Context,
  shippingAdress: GraphQlAddAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<BillingAddAddresResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  return await apolloClient.mutate({
    mutation,
    variables: shippingAdress
  });
}
