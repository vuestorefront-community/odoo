import { client } from '../../client';
import { Category, QueryCategoryArgs } from '@vue-storefront/integration-odoo-api';
import { ApolloQueryResult } from '@apollo/client';

/**
 * Get a single category.
 * 
 * @param {QueryCategoryArgs} props
 * @returns { category: Category }
 * @example
 * ```ts
 *  await sdk.odoo.getCategory({ id: 13 }))
 * 
 *  await sdk.odoo.getCategory({ slug: "/shirts" }))
 * ```
 */
export async function getCategory(props: QueryCategoryArgs) {
  const { data } = await client.post<ApolloQueryResult<{ category: Category }>>('getCategory', props);
  
  return data
}
