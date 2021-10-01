/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './billingAddAddressQuery';
import ApolloClient from 'apollo-client';
import { Address, DefaultGraphQlMutationResponse } from '../../index';
import { FetchResult } from 'apollo-link';

export default async function billingAddAddress(
  context: Context,
  shippingAdress: Address,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: shippingAdress
  });

  return response;
}
