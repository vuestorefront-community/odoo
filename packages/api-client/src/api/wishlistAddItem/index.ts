/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
export default async function wishlistAddItem(context, product, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('/shop/wishlist/add', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      product_id: Number.parseInt(product.first_variant_id)
    }
  });

  return response;

}
