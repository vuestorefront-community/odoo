/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import query from './loadUserQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { LoadUserResult } from '../../types';
export default async function loadUser(
  context: Context,
  customQuery?: CustomQuery
): Promise<FetchResult<LoadUserResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { loadUser } = context.extendQuery(
    customQuery, { loadUser: { query } }
  );

  return await apolloClient.query({
    query: gql`${loadUser.query}`,
    variables: loadUser.variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache'
  });

}
