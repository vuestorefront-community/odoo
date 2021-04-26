/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

export default async function addToCart (context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.request({
    method: 'POST',
    url: '/shop/cart/update_json',
    data: {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        product_id: Number.parseInt(params.product.id),
        add_qty: params.quantity
      }
    }
  });

  return response.data.result;

}
