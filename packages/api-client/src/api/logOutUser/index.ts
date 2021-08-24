/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import gql from 'graphql-tag';

export default async function logOutUser(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const response = await context.client.axios.post('web/session/destroy', {
    withCredentials: true,
    jsonrpc: '2.0',
    method: 'call'
  });

  return response;
}
