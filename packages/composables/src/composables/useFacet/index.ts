import {
  Context,
  FacetSearchResult,
  useFacetFactory
} from '@vue-storefront/core';
import {
  GraphQlGetCategoryParams,
  ParamsFromUrl
} from '@vue-storefront/odoo-api/src/types';
import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (
    context: Context,
    params: FacetSearchResult<ParamsFromUrl>
  ): Promise<FacetResultsData> => {
    const categoryParams: GraphQlGetCategoryParams = {
      pageSize: 100,
      search: params.input.search,
      filter: { parent: false, id: params?.input?.filter?.categoryId || null }
    };

    const { categories } = await context.$odoo.api.getCategory(categoryParams);

    const { products } = await context.$odoo.api.getProductTemplatesList(
      params.input
    );

    return {
      categories: categories.categories,
      products: products.products,
      attributes: products.attributes,
      itemsPerPage: 1,
      facets: {},
      perPageOptions: 20,
      totalProducts: products.totalCount
    };
  }
};

export default useFacetFactory<any>(factoryParams);
