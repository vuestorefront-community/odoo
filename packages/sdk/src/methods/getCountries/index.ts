import { client } from '../../client';
import { QueryCountriesArgs, Countries } from '@erpgap/odoo-sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/middleware';

/**
 * Get a list of countries.
 * 
 * @param {QueryCountriesArgs} params
 * @returns { countries: Countries }
 * @example
 * ```ts
 *  await sdk.odoo.getCountries({ search: 'Portugal'})
 * 
 *  await sdk.odoo.getCountries({ search: 'Portugal'}, {getCountries: 'custom'})
 * ```
 */
export async function getCountries(params?: QueryCountriesArgs, customQuery?: CustomQuery<'getCountries'>) {
  const { data } = await client.post<ApolloQueryResult<{ countries: Countries }>>('getCountries', [params, customQuery]);
  
  return data
}
