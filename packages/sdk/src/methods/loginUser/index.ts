import { FetchResult } from '@apollo/client';
import { Partner, MutationLoginArgs } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Login user
 * 
 * @param {MutationLoginArgs} params
 * @returns { partner: Partner }
 * @example
 * ```ts
 *  await sdk.odoo.loginUser({ email: 'user@gmail.com', password: 'pass#test3' });
 * 
 * ```
 */
export async function loginUser(params: MutationLoginArgs, customQuery?: CustomQuery<'loginUser'>) {
  const { data } = await client.post<FetchResult<{ partner: Partner }>>('loginUser', [params, customQuery]);
  
  return data
}


