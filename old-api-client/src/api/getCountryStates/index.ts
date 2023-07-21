/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetCountryParams, CountryStatesResult } from '../../index';
import query from './getCountryStatesQuery';

export default async function getCountryStates(
  context: Context,
  params: GraphQlGetCountryParams,
  customQuery?: CustomQuery
): Promise<FetchResult<CountryStatesResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: params,
    errorPolicy: 'all'
  });

  return response;
}
