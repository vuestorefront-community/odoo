import { client } from '../../client';
import { Product, QueryProductArgs } from '@erpgap/odoo-sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a single product template.
 * 
 * @param {QueryProductArgs} params
 * @returns { product: Product }
 * @example
 * ```ts
 *  await sdk.odoo.getProductTemplate({ id: 13 }))
 * 
 *  await sdk.odoo.getProductTemplate({ slug: "/shirt-13" }))
 * 
 *  await sdk.odoo.getProductTemplate({ slug: "/shirt-13" }, { getProductTemplate: 'customQueryName' }))
 * ```
 */
export async function getProductTemplate(params: QueryProductArgs, customQuery?: CustomQuery<'getProductTemplate'>) {
  const { data } = await client.post<ApolloQueryResult<{ product: Product }>>('getProductTemplate', [params, customQuery]);
  
  return data
}
