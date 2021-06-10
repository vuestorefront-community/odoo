
import { CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './shippingGetDeliveryMethodsQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function shippingGetDeliveryMethods(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query
  });

  return response.data.allDeliveryMethods;
}

