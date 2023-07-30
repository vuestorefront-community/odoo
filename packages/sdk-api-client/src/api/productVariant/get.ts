import { CustomQuery } from '@vue-storefront/middleware';
import { QueryProductVariantArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import query from './productVariantQuery';

export const getProductVariant: Endpoints['getProductVariant'] = async (context: OdooIntegrationContext, params: QueryProductVariantArgs, customQuery?: CustomQuery) => {
  
  const { getProductVariant } = context.extendQuery(
    customQuery, { getProductVariant: { query, variables: params } 
  })

  const response = await context.client.query({
    variables: getProductVariant.variables,
    query: getProductVariant.query,
  });

  return response;
};


