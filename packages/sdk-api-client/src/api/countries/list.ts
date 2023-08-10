import { Country, QueryCountryArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './getCountriesQuery';

export const getCountryList: Endpoints['getCountryList'] = async (context: OdooIntegrationContext, params?: QueryCountryArgs, customQuery?: CustomQuery) => {

  const { getCountryList } = context.extendQuery(
    customQuery, { getCountryList: { query, variables: params } 
  })

  const response = await context.client.query<{ countries: { countries: Country[] } }>({
    variables: getCountryList.variables,
    query: getCountryList.query
  });

  return response;
};
