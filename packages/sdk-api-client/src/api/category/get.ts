
import { CustomQuery } from '@vue-storefront/middleware';
import { QueryCategoryArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './categoryQuery';

export const getCategory: Endpoints['getCategory'] = async (context: OdooIntegrationContext, params: QueryCategoryArgs, customQuery?: CustomQuery) => {
  
  const { getCategory } = context.extendQuery(
    customQuery, { getCategory: { query, variables: params } }
  );

  const response = await context.client.query({
    variables: getCategory.variables,
    query: getCategory.query,
  });

  return response;
};
