import { Context, useProductFactory, ProductsSearchParams, UseProductFactoryParams} from '@vue-storefront/core';
import { GraphQlGetProductTemplateParams, Product } from '@vue-storefront/odoo-api';

const params: UseProductFactoryParams<Product, ProductsSearchParams> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<Product> => {

    const graphQlParams: GraphQlGetProductTemplateParams = {
      id: params.id
    };

    const { data } = await context.$odoo.api.getProductTemplate(graphQlParams);

    return data.product;
  }
};

export default useProductFactory<Product, ProductsSearchParams>(params);
