/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './changePasswordMutation';
import ApolloClient from 'apollo-client';
import {
  DefaultGraphQlMutationResponse,
  GraphQlResetPasswordParams
} from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function changePassword(
  context: Context,
  params: GraphQlResetPasswordParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { changePassword } = context.extendQuery(
    customQuery, { changePassword: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${changePassword.mutation}`,
    variables: changePassword.variables
  });

  return response;
}
