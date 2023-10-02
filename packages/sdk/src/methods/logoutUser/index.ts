import { FetchResult } from '@apollo/client';
import { Partner } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Load user
 * 
 * @returns { partner: Partner }
 * @example
 * ```ts
 *  await sdk.odoo.logoutUser();
 * 
 *  await sdk.odoo.logoutUser({ 'partner': 'customQuery' });  
 * ```
 */
export async function logoutUser(customQuery?: CustomQuery<'logoutUser'>) {
  const { data } = await client.post<FetchResult<{ partner: Partner }>>('partner', [customQuery]);
  
  return data
}

