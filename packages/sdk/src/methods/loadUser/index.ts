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
 *  await sdk.odoo.loadUser();
 * 
 *  await sdk.odoo.loadUser({ 'loadUser': 'customQuery' });  
 * ```
 */
export async function loadUser(customQuery?: CustomQuery<'loadUser'>) {
  const { data } = await client.post<FetchResult<{ partner: Partner }>>('loadUser', [customQuery]);
  
  return data
}

