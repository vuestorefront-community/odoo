/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { Pagination } from '@vue-storefront/odoo-api/src/types';
import query from './getProductTemplateQuery';
import { GraphQlGetProductsFilter, Product } from '../../types';
import { FetchResult } from 'apollo-link/lib/types';
export default async function getProductTemplates(
  context: Context,
  params: GraphQlGetProductsFilter,
  customQuery?: CustomQuery
): Promise<FetchResult<Product>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: params
  });

  return response.data;
}
