/* eslint-disable camelcase */

import { CustomQuery } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post(`/shop/get_combination_info/${params.productId}`, {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      combination_ids: params.combinationIds.map(id => parseInt(id))
    }
  });

  return response.data.result;

}

