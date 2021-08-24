/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import gql from 'graphql-tag';
import { GraphQlCartRemoveItemParams } from '../../types';

export default async function cartRemoveItem(
  context: Context,
  params: GraphQlCartRemoveItemParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('/shop/cart/update_json', {
    withCredentials: true,
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: Number.parseInt(params.productId),
      set_qty: 0
    }
  });

  return response;
}
