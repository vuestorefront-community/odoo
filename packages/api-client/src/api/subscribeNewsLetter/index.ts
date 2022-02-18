/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './subscribeNewsLetterMutation';
import ApolloClient from 'apollo-client';
import { GraphQlAddAddressParams, DefaultGraphQlMutationResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function subscribeNewsLetter(
  context: Context,
  params: GraphQlAddAddressParams,
  customQuery?: CustomQuery
): Promise<FetchResult<DefaultGraphQlMutationResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { subscribeNewsLetter } = context.extendQuery(
    customQuery, { subscribeNewsLetter: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${subscribeNewsLetter.mutation}`,
    variables: subscribeNewsLetter.variables
  });

  return response;
}
