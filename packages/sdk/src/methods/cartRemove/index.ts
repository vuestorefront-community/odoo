import { FetchResult } from '@apollo/client';
import { MutationCartRemoveItemArgs, Order } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Remove one product from cart.
 * 
 * @param {MutationCartRemoveItemArgs} params
 * @returns { cartRemoveItem: { order: Order } }
 * @example
 * ```ts
 *  await sdk.odoo.cartRemove({ lineId: 1 });
 * 
 *  await sdk.odoo.cartRemove({ lineId: 1 }, { 'cartRemove': 'customQuery' });
 * ```
 */
export async function cartRemove(params: MutationCartRemoveItemArgs, customQuery?: CustomQuery<'cartRemove'>) {
  const { data } = await client.post<FetchResult<{ cartRemoveItem: { order: Order } }>>('cartRemove', [params, customQuery]);
  
  return data
}
