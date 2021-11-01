/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlDeleteAddressParams } from '../../types';
import mutation from './deleteAddressMutation';

export default async function deleteAddress(
  context: Context,
  params: GraphQlDeleteAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<void>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { deleteAddress } = context.extendQuery(
    customQuery, { deleteAddress: { mutation, variables: params } }
  );

  return await apolloClient.mutate({
    mutation: gql`${deleteAddress.mutation}`,
    variables: deleteAddress.variables
  });
}
