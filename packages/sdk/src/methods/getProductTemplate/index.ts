import { client } from '../../client';
import { Product, QueryProductArgs } from '@vue-storefront/integration-odoo-api';
import { ApolloQueryResult } from '@apollo/client';

/**
 * Get a single product template.
 * 
 * @param {QueryProductArgs} props
 * @returns { product: Product }
 * @example
 * ```ts
 *  await sdk.odoo.getProductTemplate({ id: 13 }))
 * 
 *  await sdk.odoo.getProductTemplate({ slug: "/shirt-13" }))
 * ```
 */
export async function getProductTemplate(props: QueryProductArgs) {
  const { data } = await client.post<ApolloQueryResult<{ product: Product }>>('getProductTemplate', props);
  
  return data
}
