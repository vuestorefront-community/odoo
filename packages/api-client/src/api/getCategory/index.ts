import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import query from './getCategoryQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategory(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query(
    {
      query: gql`${query}`,
      variables: params
    }
  );

  return response.data.allEcommerceCategories;

}
