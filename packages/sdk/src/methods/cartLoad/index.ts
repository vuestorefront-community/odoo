import { FetchResult } from '@apollo/client';
import { CartData, Order } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to cart with specified quantity.
 * 
 * @returns { cart: CartData }
 * @example
 * ```ts
 *  await sdk.odoo.cartLoad();
 * 
 *  await sdk.odoo.cartLoad({ 'cartLoad': 'customQuery' });
 * ```
 */
export async function cartLoad(customQuery?: CustomQuery<'cartLoad'>) {
  const { data } = await client.post<FetchResult<{ cart: CartData }>>('cartLoad', [customQuery]);
  
  return data
}
