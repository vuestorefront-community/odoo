/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

export default async function getProductVariants(context, params, customQuery?: CustomQuery) {
  const response = await context.client.axios.post(`/shop/get_combination/${params.id}`, {
    jsonrpc: '2.0',
    method: 'call',
  });

  return response;

}
