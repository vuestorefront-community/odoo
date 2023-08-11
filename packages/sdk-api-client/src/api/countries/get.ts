import { CustomQuery } from '@vue-storefront/middleware';
import { QueryCountryArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './countryQuery';

export const getCountry: Endpoints['getCountry'] = async (context: OdooIntegrationContext, params: QueryCountryArgs, customQuery?: CustomQuery) => {
  
  const { getCountry } = context.extendQuery(
    customQuery, { getCountry: { query, variables: params } }
  );

  const response = await context.client.query({
    variables: getCountry.variables,
    query: getCountry.query,
  });

  return response;
};