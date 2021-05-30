/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

export default async function cartRemoveItem(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('/shop/cart/update_json', {
    withCredentials: true,
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: Number.parseInt(params.productId),
      set_qty: 0
    }
  });

  return response.data.result;

}
