/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlCartAddItemParams } from '../../types';

export default async function cartAddItem(
  context: Context,
  params: GraphQlCartAddItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('/shop/cart/update_json', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: Number.parseInt(params.productId),
      add_qty: params.quantity
    }
  });

  return response;
}
