/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import query from './paymentConfirmationQuery';
import { FetchResult } from 'apollo-link/lib/types';
import ApolloClient from 'apollo-client';

export default async function paymentConfirmation(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query
  });

  console.log('**** confirmPayment ****');
  console.log(response);
  console.log('************************');

  return response.data;
}
