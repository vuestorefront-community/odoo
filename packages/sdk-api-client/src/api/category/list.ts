
import { gql } from '@apollo/client';
import { Category, QueryCategoriesArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './categoryListQuery';

export const getCategoryList: Endpoints['getCategoryList'] = async (context: OdooIntegrationContext, params?: QueryCategoriesArgs, customQuery?: CustomQuery) => {

  const { getCategoryList } = context.extendQuery(
    customQuery, { getCategoryList: { query, variables: params } 
  })

  const response = await context.client.query<{ categories: { categories: Category[] } }>({
    variables: getCategoryList.variables,
    query: getCategoryList.query
  });

  return response;
};
