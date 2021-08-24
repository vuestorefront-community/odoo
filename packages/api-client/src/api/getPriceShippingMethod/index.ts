/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetPricinsShippingMethodParams } from '../../types';

export default async function getPriceShippingMethod(
  context: Context,
  params: GraphQlGetPricinsShippingMethodParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post(
    '/shop/carrier_rate_shipment',
    {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        carrier_id: params.shippingId
      }
    }
  );

  return response;
}
