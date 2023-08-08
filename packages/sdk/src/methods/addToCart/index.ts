import { FetchResult } from '@apollo/client';
import { MutationCartAddItemArgs, Order } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Get a single product template.
 * 
 * @param {MutationCartAddItemArgs} params
 * @returns { order: Order }
 * @example
 * ```ts
 *  await sdk.odoo.getProductVariant({ id: 13 }))
 * 
 *  await sdk.odoo.getProductVariant({ slug: "/shirt-13" }))
 * 
 *  await sdk.odoo.getProductVariant({ slug: "/shirt-13" }, { getProductVariant: 'customQueryName' }}))
 * ```
 */
export async function addToCart(params: MutationCartAddItemArgs, customQuery?: CustomQuery<'addToCart'>) {
  const { data } = await client.post<FetchResult<{ cartAddItem: { order: Order } }>>('addToCart', [params, customQuery]);
  
  return data
}
