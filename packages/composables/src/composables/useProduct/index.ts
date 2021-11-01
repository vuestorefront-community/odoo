import { Context, useProductFactory, ProductsSearchParams, UseProductFactoryParams, CustomQuery} from '@vue-storefront/core';
import { GraphQlGetProductTemplateParams, Product } from '@vue-storefront/odoo-api';

const params: UseProductFactoryParams<Product, ProductsSearchParams> = {
  productsSearch: async (context: Context, params: ProductsSearchParams & { customQuery?: CustomQuery }): Promise<Product> => {

    const { customQuery } = params;

    const graphQlParams: GraphQlGetProductTemplateParams = {
      id: params.id
    };
    const { data } = await context.$odoo.api.getProductTemplate(graphQlParams, customQuery);

    return data.product;
  }
};

export default useProductFactory<Product, ProductsSearchParams>(params);
