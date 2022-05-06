import { Context, CustomQuery} from '@vue-storefront/core';
import { Product, GraphQlAddMultipleProductsParams, GraphQlRemoveMultipleProductsParams, Cart } from '@vue-storefront/odoo-api';
import { useMultipleProductFactory, UseMultipleProductFactoryParams } from '../../factories/useMultipleProductFactory';
import useCart from '../useCart';

const params: UseMultipleProductFactoryParams<Product, GraphQlAddMultipleProductsParams, GraphQlRemoveMultipleProductsParams, Cart> = {
  provide() {
    return {
      useCart: useCart()
    };
  },

  addMultipleProductsToCart: async (context: Context, params: GraphQlAddMultipleProductsParams & { customQuery?: CustomQuery }): Promise<Cart> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.cartAddMultipleItems(params, customQuery);

    context.useCart.setCart(data.cartAddMultipleItems);
    return data.cartAddMultipleItems;
  },

  removeMultipleProductsFromCart: async (context: Context, params: GraphQlRemoveMultipleProductsParams & { customQuery?: CustomQuery }): Promise<Cart> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.cartRemoveMultipleItems(params, customQuery);

    context.useCart.setCart(data.cartRemoveMultipleItems);
    return data.cartRemoveMultipleItems;
  }
};

export default useMultipleProductFactory<Product, GraphQlAddMultipleProductsParams, GraphQlRemoveMultipleProductsParams>(params);
