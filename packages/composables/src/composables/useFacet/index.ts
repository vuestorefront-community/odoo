import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';

import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (
    context: Context,
    params: FacetSearchResult<any>
  ): Promise<FacetResultsData> => {
    const { categories } = await context.$odoo.api.getCategory({
      filter: { parent: false }
    });

    const { products } = await context.$odoo.api.getProductTemplates(
      params.input
    );
    //
    return {
      categories: categories.categories,
      products: products.products,
      attributes: [],
      itemsPerPage: 1,
      facets: {},
      perPageOptions: 20,
      totalProducts: products.totalCount
    };
  }
};

export default useFacetFactory<any>(factoryParams);
