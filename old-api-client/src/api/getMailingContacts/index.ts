/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import query from './getMailingContactsQuery';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphqlMailingContactsParams, MailingContactsResult } from '../../index';

export default async function getMailingContacts(
  context: Context,
  params: GraphqlMailingContactsParams,
  customQuery?: CustomQuery
): Promise<FetchResult<MailingContactsResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { getMailingContacts } = context.extendQuery(
    customQuery, { getMailingContacts: { query, variables: params } }
  );

  const response = await apolloClient.query({
    query: gql`${getMailingContacts.query}`,
    variables: getMailingContacts.variables,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
}
