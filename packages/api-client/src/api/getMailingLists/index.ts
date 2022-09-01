/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getMailingListsQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphqlMailingListsParams, MailingListsResult } from '../../index';

export default async function getMailingLists(
  context: Context,
  params: GraphqlMailingListsParams,
  customQuery?: CustomQuery
): Promise<FetchResult<MailingListsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getMailingLists } = context.extendQuery(
    customQuery, { getMailingLists: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getMailingLists.query}`,
    variables: getMailingLists.variables,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
}
