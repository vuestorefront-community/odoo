/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

export default async function logOutUser(context, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('web/session/destroy', {
    withCredentials: true,
    jsonrpc: '2.0',
    method: 'call'
  });

  return response;

}
