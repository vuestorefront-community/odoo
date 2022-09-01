
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlUpdatePasswordParams, UpdatePasswordResult } from '../../index';
import mutation from './updatePasswordMutation';
import ApolloClient from 'apollo-client';

export default async function updatePassword(
  context: Context,
  params: GraphQlUpdatePasswordParams,
  customQuery?: CustomQuery
): Promise<FetchResult<UpdatePasswordResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { updatePassword } = context.extendQuery(
    customQuery, { updatePassword: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${updatePassword.mutation}`,
    variables: updatePassword.variables,
    errorPolicy: 'all'
  });

  return response;
}
