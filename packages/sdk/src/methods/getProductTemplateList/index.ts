import { ApolloQueryResult } from '@apollo/client';
import { Product, QueryProductsArgs } from '@vue-storefront/integration-odoo-api';
import { client } from '../../client';

/**
 * Get a list of products template.
 * 
 * @param {QueryProductsArgs} props
 * @returns { products: { products: Product[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getProductTemplateList({ pageSize: 12, filter: { categoryId: [13] } }))
 * ```
 */
export async function getProductTemplateList(props?: QueryProductsArgs) {
  const { data } = await client.post<ApolloQueryResult<{ products: { products: Product[] } }>>('getProductTemplateList', props);
  
  return data
}
