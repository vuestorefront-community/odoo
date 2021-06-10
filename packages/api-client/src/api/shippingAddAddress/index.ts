/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import mutation from './shippingAddAdressMutation';
import ApolloClient from 'apollo-client';
import { Address } from '../../types';

export default async function shippingAddAdress(context, shippingAdress: Address, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.mutate<Address>({
    mutation,
    variables: shippingAdress
  });

  return response;

}
