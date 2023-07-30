import { ApolloQueryResult } from '@apollo/client';
import { Category, QueryCategoriesArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a list of categories.
 * 
 * @param {QueryCategoriesArgs} params
 * @returns { categories: { categories: Category[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getCategoryList({ pageSize: 12, filter: { id: 13 } }))
 * 
 *  await sdk.odoo.getCategoryList({ pageSize: 12, filter: { id: 13 } }, { getCategoryList: 'customQueryName' }}))
 * ```
 */
export async function getCategoryList(params?: QueryCategoriesArgs, customQuery?: CustomQuery<'getCategoryList'>) {
  const { data } = await client.post<ApolloQueryResult<{ categories: { categories: Category[] } }>>('getCategoryList', [params, customQuery]);
  
  return data
}
