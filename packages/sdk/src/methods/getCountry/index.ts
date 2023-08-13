import { client } from '../../client';
import { Country, QueryCategoryArgs, QueryCountryArgs } from '@erpgap/odoo-sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a single country.
 * 
 * @param {QueryCountryArgs} params
 * @returns { country: Country }
 * @example
 * ```ts
 *  await sdk.odoo.getCountry({ id: 13 }))
 * 
 *  await sdk.odoo.getCountry({ name: "/Andorra" }))
 * 
 *  await sdk.odoo.getCountry({ name: "/Andorra" }, { getCountry: 'customQueryName' }}))
 * ```
 */
export async function getCountry(params: QueryCountryArgs, customQuery?: CustomQuery<'getCountry'>) {
  const { data } = await client.post<ApolloQueryResult<{ country: Country }>>('getCountry', [params, customQuery]);
  
  return data
}
