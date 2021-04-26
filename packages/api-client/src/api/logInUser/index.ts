/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

export default async function logInUser (context, { username, password }, customQuery?: CustomQuery) {

  const response = await context.client.axios.post('web/session/authenticate', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      db: 'v13_vsfdemo',
      login: username,
      password: password
    }
  });

  return response;

}
