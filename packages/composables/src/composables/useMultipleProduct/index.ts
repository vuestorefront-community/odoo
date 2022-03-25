import { Context, CustomQuery} from '@vue-storefront/core';
import { Product, GraphQlAddMultipleProductsParams, Cart } from '@vue-storefront/odoo-api';
import { useMultipleProductFactory, UseMultipleProductFactoryParams } from '../../factories/useMultipleProductFactory';
import useCart from '../useCart';

const params: UseMultipleProductFactoryParams<Product, GraphQlAddMultipleProductsParams, Cart> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  addMultipleProductsToCart: async (context: Context, params: GraphQlAddMultipleProductsParams & { customQuery?: CustomQuery }): Promise<Cart> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.cartAddMulipleItems(params, customQuery);

    context.useCart.setCart(data.cartAddMultipleItems);
    return data.cartAddMultipleItems;
  }
};

export default useMultipleProductFactory<Product, GraphQlAddMultipleProductsParams>(params);
