/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './shippingAddAdressMutation';
import ApolloClient from 'apollo-client';
import { Address, DefaultGraphQlMutationResponse } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';

export default async function shippingAddAdress(
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
