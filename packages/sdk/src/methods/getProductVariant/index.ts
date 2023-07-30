import { client } from '../../client';
import { ProductVariant, QueryProductVariantArgs } from '@erpgap/odoo-sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/middleware';

/**
 * Get a single product template.
 * 
 * @param {QueryProductArgs} params
 * @returns { product: Product }
 * @example
 * ```ts
 *  await sdk.odoo.getProductVariant({ id: 13 }))
 * 
 *  await sdk.odoo.getProductVariant({ slug: "/shirt-13" }))
 * 
 *  await sdk.odoo.getProductVariant({ slug: "/shirt-13" }, { getProductVariant: 'customQueryName' }}))
 * ```
 */
export async function getProductVariant(params: QueryProductVariantArgs, customQuery?: CustomQuery<'getProductVariant'>) {
  const { data } = await client.post<ApolloQueryResult<{ product: ProductVariant }>>('getProductVariant', [params, customQuery]);
  
  return data
}
