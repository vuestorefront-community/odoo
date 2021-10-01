import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { GraphQlGetProductTemplateParams } from '@vue-storefront/odoo-api';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (
    context: Context,
    params: ProductsSearchParams
  ): Promise<ProductsResponse> => {
    const graphQlParams: GraphQlGetProductTemplateParams = {
      id: params.id
    };

    const { product } = await context.$odoo.api.getProductTemplate(
      graphQlParams
    );
    return product;
  }
};

export default useProductFactory<ProductsResponse, any>(params);
