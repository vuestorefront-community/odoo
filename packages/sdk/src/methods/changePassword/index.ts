import { FetchResult } from '@apollo/client';
import { MutationChangePasswordArgs, Partner } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Change user password
 * 
 * @param {MutationChangePasswordArgs} params
 * @returns { partner: Partner }
 * @example
 * ```ts
 *  await sdk.odoo.changePassword({ newPassword: 'newPassword', token: 'token' }); *
 * ```
 */
export async function changePassword(params: MutationChangePasswordArgs, customQuery?: CustomQuery<'changePassword'>) {
  const { data } = await client.post<FetchResult<{ partner: Partner }>>('changePassword', [params, customQuery]);
  
  return data
}  
