/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getProductTemplateQuery';
import { GraphQlGetProductTemplateParams, SingleProductResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';
export default async function getProductTemplate(
  context: Context,
  params: GraphQlGetProductTemplateParams,
  customQuery?: CustomQuery
): Promise<FetchResult<SingleProductResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: params
  });

  return response;
}
