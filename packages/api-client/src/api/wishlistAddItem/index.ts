/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import axios from 'axios'
export default async function wishlistAddItem(context, product, customQuery?: CustomQuery) {

  // const response = await context.client.axios.post('/shop/cart/update_json', {
  //   jsonrpc: '2.0',
  //   method: 'call',
  //   params: {
  //     product_id: Number.parseInt(params.productId),
  //     add_qty: params.quantity
  //   }
  // });



  const responnse = await axios.post('https://odoovsf-b54f.restdb.io/rest/wishlist?key=60b0533e318a330b62f587e2', product,
    {
      headers: {
        'x-apikey': '60b0533e318a330b62f587e2'
      }
    })

  return responnse;

}
