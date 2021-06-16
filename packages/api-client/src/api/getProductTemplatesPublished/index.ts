/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

export default async function getProductTemplatesPublished(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('/shop/products', {
    jsonrpc: '2.0',
    method: 'call',
    params
  });

  return response;

}
