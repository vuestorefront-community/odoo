import { gql } from '@apollo/client';
import { Endpoints } from '../../types';
import { productFragment } from '../fragments/';
import { Product, QueryProductArgs } from '../../gql/graphql'

export const getProductTemplate: Endpoints['getProductTemplate'] = async (context, variables: QueryProductArgs) => {
  
  const response = await context.client.query({
    variables,
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    query: gql`
      query ($id: Int, $slug: String, $barcode: String) {
        product(id: $id, slug: $slug, barcode: $barcode) {
          ${productFragment}
        }
      }`
    });

    

  return response;
};
