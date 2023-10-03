import { FetchResult } from '@apollo/client';
import { User, MutationResetPasswordArgs } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Send a token reset password
 *
 * @param {MutationResetPasswordArgs} mutationResetPasswordArgs
 * @returns { user: User }
 * @example
 * ```ts
 *  await sdk.odoo.sendResetUserPassword({ email: 'user@gmail.com' });
 *
 * ```
 */
export async function sendResetUserPassword(params: MutationResetPasswordArgs, customQuery?: CustomQuery<'sendResetUserPassword'>) {
  const { data } = await client.post<FetchResult<{ user: User }>>('sendResetUserPassword', [params, customQuery]);

  return data;
}

