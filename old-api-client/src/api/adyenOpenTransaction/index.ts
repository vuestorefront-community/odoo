
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAdyenOpenTransaction, adyenOpenTransactionResult } from '../../index';
import mutation from './adyenOpenTransactionMutation';
import ApolloClient from 'apollo-client';

export default async function adyenOpenTransaction(
  context: Context,
  params: GraphQlAdyenOpenTransaction,
  customQuery?: CustomQuery
): Promise<FetchResult<adyenOpenTransactionResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { adyenOpenTransaction } = context.extendQuery(
    customQuery, { adyenOpenTransaction: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${adyenOpenTransaction.mutation}`,
    variables: adyenOpenTransaction.variables,
    errorPolicy: 'all'
  });

  return response;
}
