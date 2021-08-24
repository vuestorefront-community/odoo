/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { AgnosticUser } from '../../types';

export default async function logInUser(
  context: Context,
  { username, password }: AgnosticUser,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('web/session/authenticate', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      db: context.config.database,
      login: username,
      password: password
    }
  });

  return response;
}
