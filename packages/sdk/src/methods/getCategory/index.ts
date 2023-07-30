import { client } from '../../client';
import { Category, QueryCategoryArgs } from '@erpgap/odoo-sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a single category.
 * 
 * @param {QueryCategoryArgs} params
 * @returns { category: Category }
 * @example
 * ```ts
 *  await sdk.odoo.getCategory({ id: 13 }))
 * 
 *  await sdk.odoo.getCategory({ slug: "/shirts" }))
 * 
 *  await sdk.odoo.getCategory({ slug: "/shirts" }, { getCategory: 'customQueryName' }}))
 * ```
 */
export async function getCategory(params: QueryCategoryArgs, customQuery?: CustomQuery<'getCategory'>) {
  const { data } = await client.post<ApolloQueryResult<{ category: Category }>>('getCategory', [params, customQuery]);
  
  return data
}
