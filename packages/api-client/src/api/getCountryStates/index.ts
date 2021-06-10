
import { CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { Pagination } from '@vue-storefront/odoo-api/src/types';
import query from './getCountryStatesQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCountryStates(context, params, customQuery?: CustomQuery) {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const response = await apolloClient.query({
    query,
    variables: { countryId: params.id }
  });

  return response.data?.allCountries.length > 0 ? response.data?.allCountries[0]?.states : null;

}

