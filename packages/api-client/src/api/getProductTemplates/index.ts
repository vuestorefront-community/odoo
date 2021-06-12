
import { CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { Pagination } from '@vue-storefront/odoo-api/src/types';
import query from './getProductTemplateQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProductTemplates(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const searchParams: Pagination = {
    limit: 20,
    offset: 0,
    ...params
  };
  const response = await apolloClient.query({
    query,
    variables: searchParams
  });

  return response.data.allProductTemplates;

}

