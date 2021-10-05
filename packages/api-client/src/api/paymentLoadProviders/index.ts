/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import query from './paymentLoadQuery';
import { FetchResult } from 'apollo-link/lib/types';
import ApolloClient from 'apollo-client';
import { PaymentLoadProvidersResult } from '../..';

export default async function paymentLoadProviders(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<PaymentLoadProvidersResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query
  });

  return response;
}
