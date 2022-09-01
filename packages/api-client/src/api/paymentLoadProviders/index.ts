/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import gql from 'graphql-tag';

import { Context, CustomQuery } from '@vue-storefront/core';
import query from './paymentLoadQuery';
import { FetchResult } from 'apollo-link/lib/types';
import ApolloClient from 'apollo-client';
import { PaymentLoadProvidersResult } from '../..';

export default async function paymentLoadProviders(
  context: Context,
  params: any,
  customQuery?: CustomQuery
): Promise<FetchResult<PaymentLoadProvidersResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { paymentLoadProviders } = context.extendQuery(
    customQuery, { paymentLoadProviders: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${paymentLoadProviders.query}`,
    variables: paymentLoadProviders.variables,
    errorPolicy: 'all'
  });

  return response;
}
