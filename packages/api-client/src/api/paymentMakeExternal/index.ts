
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlMakePaymentParams, PaymentMakeExternalResult } from '../../index';
import mutation from './paymentMakeExternalMutation';
import ApolloClient from 'apollo-client';

export default async function paymentMakeExternalMutation(
  context: Context,
  params: GraphQlMakePaymentParams,
  customQuery?: CustomQuery
): Promise<FetchResult<PaymentMakeExternalResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { paymentMakeExternalMutation } = context.extendQuery(
    customQuery, { paymentMakeExternalMutation: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${paymentMakeExternalMutation.mutation}`,
    variables: paymentMakeExternalMutation.variables,
    errorPolicy: 'all'
  });

  return response;
}
