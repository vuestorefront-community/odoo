/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './shippingUpdateAddressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlUpdateAddressParams, ShippingUpdateAddressResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function shippingUpdateAddress(
  context: Context,
  shippingAdress: GraphQlUpdateAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ShippingUpdateAddressResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate({
    mutation,
    variables: shippingAdress
  });

  return response.data;
}
