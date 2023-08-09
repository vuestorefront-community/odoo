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
 *  await sdk.odoo.cartAdd({ productId: props.product.firstVariant.id, quantity: 1 });
 * 
 *  await sdk.odoo.cartAdd({ productId: Number(product.id), quantity: 1 };
 * 
 *  await sdk.odoo.cartAdd({ productId: product.id, quantity: 1 }, { 'cartAdd': 'customQuery' });
 * ```
 */
export async function cartAdd(params: MutationCartAddItemArgs, customQuery?: CustomQuery<'cartAdd'>) {
  const { data } = await client.post<FetchResult<{ cartAddItem: { order: Order } }>>('cartAdd', [params, customQuery]);
  
  return data
}
