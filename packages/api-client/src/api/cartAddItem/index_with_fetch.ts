/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

export default async function cartAddItem(context, params, customQuery?: CustomQuery) {

  const response = await fetch('https://vsfdemo.labs.odoogap.com/shop/cart/update_json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: {
        product_id: Number.parseInt(params.product.id),
        add_qty: params.quantity
      }
    })
  })

  return response

}
