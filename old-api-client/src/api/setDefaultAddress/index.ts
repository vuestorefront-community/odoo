/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './setDefaultAddressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlSetDefaultAddressParams, SetDefaultAddressResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function setDefaultAddress(
  context: Context,
  params: GraphQlSetDefaultAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<SetDefaultAddressResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { setDefaultAddress } = context.extendQuery(
    customQuery, { setDefaultAddress: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${setDefaultAddress.mutation}`,
    variables: setDefaultAddress.variables,
    errorPolicy: 'all'
  });

  return response;
}
