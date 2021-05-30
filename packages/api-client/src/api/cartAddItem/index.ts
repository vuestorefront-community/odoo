/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

export default async function cartAddItem(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('/shop/cart/update_json', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: Number.parseInt(params.productId),
      add_qty: params.quantity
    }
  });

  return response.data.result;

}
