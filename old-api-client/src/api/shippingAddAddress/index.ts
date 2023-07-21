/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './shippingAddAdressMutation';
import ApolloClient from 'apollo-client';
import { GraphQlAddAddressParams, DefaultGraphQlMutationResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function shippingAddAdress(
  context: Context,
  params: GraphQlAddAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { shippingAddAdress } = context.extendQuery(
    customQuery, { shippingAddAdress: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${shippingAddAdress.mutation}`,
    variables: shippingAddAdress.variables,
    errorPolicy: 'all'
  });

  return response;
}
