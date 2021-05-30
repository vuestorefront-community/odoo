import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {

    const categories = await context.$odoo.api.getCategory(params);
    const products = await context.$odoo.api.getProduct({ ...params, published: true });
    return {
      categories,
      products
    };
  }
};

export default useFacetFactory<any>(factoryParams);
