/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import axios from 'axios';
import { Product } from '../../types';
export default async function wishlistRemoveItem(
  context: Context,
  product: Product,
  customQuery?: CustomQuery
): Promise<any> {
  const response = await context.client.axios.post(
    `/shop/wishlist/remove/${product.id}`,
    {
      jsonrpc: '2.0',
      method: 'call'
    }
  );

  return response;
}
