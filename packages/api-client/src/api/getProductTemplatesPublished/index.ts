/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductTemplateParams } from '../../types';

export default async function getProductTemplatesPublished(
  context: Context,
  params: GraphQlGetProductTemplateParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('/shop/products', {
    jsonrpc: '2.0',
    method: 'call',
    params
  });

  return response;
}
