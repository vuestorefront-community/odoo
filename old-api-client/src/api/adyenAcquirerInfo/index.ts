
/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlAdyenAcquirerInfo, adyenAcquirerInfoResult } from '../../index';
import mutation from './adyenAcquirerInfoMutation';
import ApolloClient from 'apollo-client';

export default async function adyenAcquirerInfo(
  context: Context,
  params: GraphQlAdyenAcquirerInfo,
  customQuery?: CustomQuery
): Promise<FetchResult<adyenAcquirerInfoResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { adyenAcquirerInfo } = context.extendQuery(
    customQuery, { adyenAcquirerInfo: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${adyenAcquirerInfo.mutation}`,
    variables: adyenAcquirerInfo.variables,
    errorPolicy: 'all'
  });

  return response;
}
