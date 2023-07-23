import { CustomQuery } from '@vue-storefront/middleware';
import { QueryProductArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './productQuery';

export const getProductTemplate: Endpoints['getProductTemplate'] = async (context: OdooIntegrationContext, params: QueryProductArgs, customQuery?: CustomQuery) => {
  
  const { getProductTemplate } = context.extendQuery(
    customQuery, { getProductTemplate: { query, variables: params } 
  })
    
  const response = await context.client.query({
    variables: getProductTemplate.variables,
    query: getProductTemplate.query,
  });

  return response;
};


