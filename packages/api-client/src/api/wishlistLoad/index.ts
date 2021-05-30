/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import query from './cartLoadQuery';
import ApolloClient from 'apollo-client';
import axios from 'axios'

export default async function wishlistLoad(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  // const response = await apolloClient.query({
  //   fetchPolicy: "no-cache",
  //   query,
  //   variables: params
  // });
  const response = await axios.get('https://odoovsf-b54f.restdb.io/rest/wishlist', {
    headers: {
      'x-apikey': '60b0533e318a330b62f587e2'
    }
  })

  return {
    items: response.data
  }

}
