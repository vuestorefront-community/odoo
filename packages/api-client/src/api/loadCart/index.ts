/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import query from './loadCartQuery';
import ApolloClient from 'apollo-client';

export default async function loadCart (context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: params
  });

  return response.data.allSaleOrders.length > 0 ? response.data.allSaleOrders[0] : [];

}
