import { ApolloQueryResult } from '@apollo/client';
import { Product, QueryProductsArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';

/**
 * Get a list of products template.
 * 
 * @param {QueryProductsArgs} params
 * @returns { products: { products: Product[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getProductTemplateList({ pageSize: 12, filter: { categoryId: [13] } }))
 * 
 *  await sdk.odoo.getProductTemplateList({ pageSize: 12, filter: { categoryId: [13] } }, { getProductTemplateList: 'customQueryName' }}))
 * ```
 */
export async function getProductTemplateList(params?: QueryProductsArgs, customQuery?: CustomQuery<'getProductTemplateList'>) {
  const { data } = await client.post<ApolloQueryResult<{ products: { products: Product[] } }>>('getProductTemplateList', [params, customQuery]);
  
  return data
}
