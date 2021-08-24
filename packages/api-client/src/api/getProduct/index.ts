/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */

import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetProductParams } from '../../types';

export default async function getProduct(
  context: Context,
  params: GraphQlGetProductParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post(
    `/shop/get_combination_info/${params.productId}`,
    {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        combination_ids: params.combinationIds.map((id) => parseInt(id))
      }
    }
  );

  return response.data.result;
}
