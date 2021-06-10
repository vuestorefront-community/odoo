/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import query from './cartLoadQuery';
import ApolloClient from 'apollo-client';

export default async function cartLoad(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    fetchPolicy: "no-cache",
    query
  });

  return response.data.partnerShoppingCart.length > 0 ? response.data.partnerShoppingCart[0] : [];

}
