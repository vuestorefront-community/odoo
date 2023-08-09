import { FetchResult } from '@apollo/client';
import { MutationCartAddItemArgs, Order } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to cart with specified quantity.
 * 
 * @param {MutationCartAddItemArgs} params
 * @returns { cartAddItem: { order: Order } }
 * @example
 * ```ts
 *  await sdk.odoo.addToCart({ productId: props.product.firstVariant.id, quantity: 1 });
 * 
 *  await sdk.odoo.addToCart({ productId: Number(product.id), quantity: 1 };
 * 
 *  await sdk.odoo.addToCart({ productId: product.id, quantity: 1 }, { 'addToCart': 'customQuery' });
 * ```
 */
export async function addToCart(params: MutationCartAddItemArgs, customQuery?: CustomQuery<'addToCart'>) {
  const { data } = await client.post<FetchResult<{ cartAddItem: { order: Order } }>>('addToCart', [params, customQuery]);
  
  return data
}
