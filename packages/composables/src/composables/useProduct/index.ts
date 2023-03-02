import { Context, useProductFactory, UseProductFactoryParams, CustomQuery} from '@vue-storefront/core';
import { GraphQlGetProductTemplateParams, Product } from '@vue-storefront/odoo-api';

const params: UseProductFactoryParams<Product, GraphQlGetProductTemplateParams> = {
  productsSearch: async (context: Context, params: GraphQlGetProductTemplateParams & { customQuery?: CustomQuery }): Promise<Product> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.getProductTemplate(params, customQuery, params.cacheKey);

    return data.product;
  }
};

export default useProductFactory<Product, GraphQlGetProductTemplateParams>(params);
