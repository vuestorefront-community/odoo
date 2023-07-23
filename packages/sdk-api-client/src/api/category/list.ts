
import { gql } from '@apollo/client';
import { Product, QueryProductsArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './productListQuery';

export const getProductTemplateList: Endpoints['getProductTemplateList'] = async (context: OdooIntegrationContext, params?: QueryProductsArgs, customQuery?: CustomQuery) => {

  const { getProductTemplateList } = context.extendQuery(
    customQuery, { getProductTemplateList: { query, variables: params } 
  })

  const response = await context.client.query<{ products: { products: Product[] } }>({
    variables: getProductTemplateList.variables,
    query: getProductTemplateList.query
  });

  return response;
};
