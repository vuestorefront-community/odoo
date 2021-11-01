/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import mutation from './logInMutation';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlLoginParams, LoginResult } from '../../index';

export default async function logInUser(
  context: Context,
  params: GraphQlLoginParams,
  customQuery?: CustomQuery
): Promise<FetchResult<LoginResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { logInUser } = context.extendQuery(
    customQuery, { logInUser: { mutation, variables: params } }
  );

  return await apolloClient.mutate({
    mutation: gql`${logInUser.mutation}`,
    variables: logInUser.variables,
    fetchPolicy: 'no-cache'
  });

}
