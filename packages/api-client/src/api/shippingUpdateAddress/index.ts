/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './shippingUpdateAddressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlUpdateAddressParams, ShippingUpdateAddressResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function shippingUpdateAddress(
  context: Context,
  params: GraphQlUpdateAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ShippingUpdateAddressResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { shippingUpdateAddress } = context.extendQuery(
    customQuery, { shippingUpdateAddress: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${shippingUpdateAddress.mutation}`,
    variables: shippingUpdateAddress.variables,
    errorPolicy: 'all'
  });

  return response;
}
