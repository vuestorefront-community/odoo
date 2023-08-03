
import { CustomQuery } from '@vue-storefront/middleware';
import { QueryCountriesArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './getCountriesQuery';

export const getCountries: Endpoints['getCountries'] = async (context: OdooIntegrationContext, params: QueryCountriesArgs, customQuery?: CustomQuery) => {
  
  const { getCountries } = context.extendQuery(
    customQuery, { getCountries: { query, variables: params } }
  );

  const response = await context.client.query({
    variables: getCountries.variables,
    query: getCountries.query,
  });

  return response;
};
