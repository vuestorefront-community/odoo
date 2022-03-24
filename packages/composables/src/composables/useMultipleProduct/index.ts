import { Context, CustomQuery} from '@vue-storefront/core';
import { Product, GraphQlAddMultipleProductsParams, Cart } from '@vue-storefront/odoo-api';
import { useMultipleProductFactory, UseMultipleProductFactoryParams } from '../../factories/useMultipleProductFactory';

const params: UseMultipleProductFactoryParams<Product, GraphQlAddMultipleProductsParams, Cart> = {

  addMultipleProductsToCart: async (context: Context, params: GraphQlAddMultipleProductsParams & { customQuery?: CustomQuery }): Promise<Cart> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.cartAddMulipleItems(params, customQuery);

    return data.cartAddMultipleItems;
  }
};

export default useMultipleProductFactory<Product, GraphQlAddMultipleProductsParams>(params);
