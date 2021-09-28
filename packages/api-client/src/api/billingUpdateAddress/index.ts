/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './billingUpdateAddressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlUpdateAddressParams, DefaultGraphQlMutationResponse } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function billingUpdateAddress(
  context: Context,
  shippingAdress: GraphQlUpdateAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: shippingAdress
  });

  return response.data;
}
