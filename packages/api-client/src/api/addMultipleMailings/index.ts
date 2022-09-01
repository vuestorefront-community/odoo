
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAddMultipleMailings, addMultipleMailingsResult } from '../../index';
import mutation from './addMultipleMailingsMutation';
import ApolloClient from 'apollo-client';

export default async function addMultipleMailings(
  context: Context,
  params: GraphQlAddMultipleMailings,
  customQuery?: CustomQuery
): Promise<FetchResult<addMultipleMailingsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { addMultipleMailings } = context.extendQuery(
    customQuery, { addMultipleMailings: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${addMultipleMailings.mutation}`,
    variables: addMultipleMailings.variables,
    errorPolicy: 'all'
  });

  return response;
}
