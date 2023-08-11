import { ApolloQueryResult } from '@apollo/client';
import { Country, QueryCountriesArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';

/**
 * Get a list of countries.
 * 
 * @param {QueryCountriesArgs} params
 * @returns { countries: {countries: Country[] }}
 * @example
 * ```ts
 *  await sdk.odoo.getCountries({ search: 'Portugal'})
 * 
 *  await sdk.odoo.getCountries({ search: 'Portugal'}, {getCountries: 'custom'})
 * ```
 */
export async function getCountryList(params?: QueryCountriesArgs, customQuery?: CustomQuery<'getCountryList'>) {
  const { data } = await client.post<ApolloQueryResult<{ countries: Country[] }>>('getCountryList', [params, customQuery]);
  
  return data
}
