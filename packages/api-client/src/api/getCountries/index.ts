/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { FetchResult } from 'apollo-link/lib/types';
import { CountriesResult } from '../..';
import query from './getCountriesQuery';

export default async function getCountries(
  context: Context,
  params: Record<string, string>,
  customQuery?: CustomQuery
): Promise<FetchResult<CountriesResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query
  });

  return response;
}
