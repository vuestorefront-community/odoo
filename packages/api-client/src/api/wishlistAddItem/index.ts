/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { Product } from '../../types';
export default async function wishlistAddItem(
  context: Context,
  product: Product,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('/shop/wishlist/add', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: product.first_variant_id
    }
  });

  return response;
}
