import { ApolloQueryResult } from '@apollo/client';
import { Category, QueryCategoriesArgs } from '@vue-storefront/integration-odoo-api';
import { client } from '../../client';

/**
 * Get a list of categories.
 * 
 * @param {QueryCategoriesArgs} props
 * @returns { categories: { categories: Category[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getCategoryList({ pageSize: 12, filter: { id: 13 } }))
 * ```
 */
export async function getCategoryList(props?: QueryCategoriesArgs) {
  const { data } = await client.post<ApolloQueryResult<{ categories: { categories: Category[] } }>>('getCategoryList', props);
  
  return data
}
