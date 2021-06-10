/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

export default async function getPriceShippingMethod(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('/shop/carrier_rate_shipment', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      carrier_id: params.shippingId,
    }
  });

  return response

}
