/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductVariants } from '../../types';

export default async function getProductVariants(
  context: Context,
  params: GraphQlGetProductVariants,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post(
    `/shop/get_combinations/${params.productId}`,
    {
      jsonrpc: '2.0',
      method: 'call'
    }
  );

  return response.data.result.attribute_values;
}
