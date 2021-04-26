/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

export default async function logOutUser (context, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('web/session/logout', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      db: 'v13_vsfdemo'
    }
  });

  return response;

}
