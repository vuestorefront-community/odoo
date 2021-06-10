/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import axios from 'axios'
export default async function wishlistRemoveItem(context, product, customQuery?: CustomQuery) {

  const response = await context.client.axios.post(`/shop/wishlist/remove/${product.id}`, {
    jsonrpc: '2.0',
    method: 'call'
  });

  return response;
}
