import { gql } from '@apollo/client';
import { Product, QueryProductsArgs } from '../../gql/graphql';
import { Endpoints } from '../../types';
import { productFragment } from '../fragments/';

export const getProductTemplateList: Endpoints['getProductTemplateList'] = async (context, variables?: QueryProductsArgs) => {
  
  const response = await context.client.query<{ products: { products: Product[] } }>({
    variables,
    errorPolicy: 'all',
    query: gql`
      query(
        $filter: ProductFilterInput
        $currentPage: Int
        $pageSize: Int = 5
        $search: String
        $sort: ProductSortInput
      ) {
        products(
          filter: $filter
          currentPage: $currentPage
          pageSize: $pageSize
          search: $search
          sort: $sort
        ) {
          totalCount
          attributeValues {
            id
            name
            displayType
            name
            htmlColor
            search
            attribute{
              id
              name
            }
            
          }
          products {
            ${productFragment}
          }
        }
      }`
    });

    

  return response;
};
