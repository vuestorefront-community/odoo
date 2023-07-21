
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAdyenMakeDirectPayment, adyenMakeDirectPaymentResult } from '../../index';
import mutation from './adyenMakeDirectPaymentMutation';
import ApolloClient from 'apollo-client';

export default async function adyenMakeDirectPayment(
  context: Context,
  params: GraphQlAdyenMakeDirectPayment,
  customQuery?: CustomQuery
): Promise<FetchResult<adyenMakeDirectPaymentResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { adyenMakeDirectPayment } = context.extendQuery(
    customQuery, { adyenMakeDirectPayment: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${adyenMakeDirectPayment.mutation}`,
    variables: adyenMakeDirectPayment.variables,
    errorPolicy: 'all'
  });

  return response;
}
