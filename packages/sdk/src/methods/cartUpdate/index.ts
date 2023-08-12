import { FetchResult } from '@apollo/client';
import { MutationCartUpdateItemArgs, Order } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to cart with specified quantity.
 * 
 * @param {MutationcartUpdateItemArgs} params
 * @returns { cartUpdateItem: { order: Order } }
 * @example
 * ```ts
 *  await sdk.odoo.cartUpdate({ productId: props.product.firstVariant.id, quantity: 1 });
 * 
 *  await sdk.odoo.cartUpdate({ productId: Number(product.id), quantity: 1 };
 * 
 *  await sdk.odoo.cartUpdate({ productId: product.id, quantity: 1 }, { 'cartUpdate': 'customQuery' });
 * ```
 */
export async function cartUpdate(params: MutationCartUpdateItemArgs, customQuery?: CustomQuery<'cartUpdate'>) {
  const { data } = await client.post<FetchResult<{ cartUpdateItem: { order: Order } }>>('cartUpdate', [params, customQuery]);
  
  return data
}
