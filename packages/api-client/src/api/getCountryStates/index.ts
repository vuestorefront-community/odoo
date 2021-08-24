/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { GraphQlGetAllCountryStatesParams } from '../../types';
import query from './getCountryStatesQuery';

export default async function getCountryStates(
  context: Context,
  params: GraphQlGetAllCountryStatesParams,
  customQuery?: CustomQuery
): Promise<FetchResult> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: { countryId: params.countryId }
  });

  return response.data?.allCountries.length > 0
    ? response.data?.allCountries[0]?.states
    : null;
}
