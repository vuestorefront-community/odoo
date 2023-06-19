import { Context, CustomQuery} from '@vue-storefront/core';
import { Product, GraphQlAddMultipleProductsParams, GraphQlRemoveMultipleProductsParams, Cart } from '@vue-storefront/odoo-api';
import { useMultipleProductFactory, UseMultipleProductFactoryParams } from '../../factories/useMultipleProductFactory';
import useCart from '../useCart';

const resolvePath = (object, path, defaultValue) => path
  .split('.')
  .reduce((o, p) => o ? o[p] : defaultValue, object);

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

    const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
    context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cartAddMultipleItems?.order, cookieIndex, 0) || 0);

    return data.cartAddMultipleItems;
  },

  removeMultipleProductsFromCart: async (context: Context, params: GraphQlRemoveMultipleProductsParams & { customQuery?: CustomQuery }): Promise<Cart> => {

    const { customQuery } = params;

    const { data } = await context.$odoo.api.cartRemoveMultipleItems(params, customQuery);

    context.useCart.setCart(data.cartRemoveMultipleItems);

    const cookieIndex = context?.$odoo?.config?.app?.$config?.cart?.cookieIndex || 'orderLines.length';
    context.$odoo.config.app.$cookies.set('cart-size', resolvePath(data?.cartRemoveMultipleItems?.order, cookieIndex, 0) || 0);

    return data.cartRemoveMultipleItems;
  }
};

export default useMultipleProductFactory<Product, GraphQlAddMultipleProductsParams, GraphQlRemoveMultipleProductsParams>(params);
