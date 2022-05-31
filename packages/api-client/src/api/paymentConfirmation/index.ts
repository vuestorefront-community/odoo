/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import query from './paymentConfirmationQuery';
import { FetchResult } from 'apollo-link/lib/types';
import ApolloClient from 'apollo-client';

export default async function paymentConfirmation(
  context: Context,
  params: any,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { paymentConfirmation } = context.extendQuery(
    customQuery, { paymentConfirmation: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${paymentConfirmation.query}`,
    variables: paymentConfirmation.variables,
    errorPolicy: 'all'
  });

  return response;
}
