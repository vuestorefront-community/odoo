
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAdyenPaymentDetails, adyenPaymentDetailsResult } from '../../index';
import mutation from './adyenPaymentDetailsMutation';
import ApolloClient from 'apollo-client';

export default async function adyenPaymentDetails(
  context: Context,
  params: GraphQlAdyenPaymentDetails,
  customQuery?: CustomQuery
): Promise<FetchResult<adyenPaymentDetailsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { adyenPaymentDetails } = context.extendQuery(
    customQuery, { adyenPaymentDetails: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${adyenPaymentDetails.mutation}`,
    variables: adyenPaymentDetails.variables,
    errorPolicy: 'all'
  });

  return response;
}
