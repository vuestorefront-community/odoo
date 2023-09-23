import { FetchResult } from '@apollo/client';
import { MutationUpdatePasswordArgs, User } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Change user password
 * 
 * @param {MutationUpdatePasswordArgs} params
 * @returns { user: User }
 * @example
 * ```ts
 *  await sdk.odoo.updatePassword({ currentPassword: '', newPassword: 'newPassword' }); *
 * ```
 */
export async function updatePassword(params: MutationUpdatePasswordArgs, customQuery?: CustomQuery<'updatePassword'>) {
  const { data } = await client.post<FetchResult<{ user: User }>>('updatePassword', [params, customQuery]);
  
  return data
}
