import { Context, useFacetFactory } from '@vue-storefront/core';
import { ParamsFromUrl, SearchResultParams } from '@vue-storefront/odoo-api/src/types/types';
import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: SearchResultParams<ParamsFromUrl>): Promise<FacetResultsData> => {

    const { customQueryProducts, customQueryCategories } = params.input;

    let categoryResponse = null;
    let categoriesResponse = null;
    if (params.input.fetchCategory) {
      categoryResponse = await context.$odoo.api.getCategory(params.input.categoryParams, customQueryCategories);
    }
    if (params.input.fetchCategories) {
      categoriesResponse = await context.$odoo.api.getCategories(params.input.categoryParams, customQueryCategories);
    }

    const { data: productData } = await context.$odoo.api.getProductTemplatesList(params.input.productParams, customQueryProducts);

    return {
      minPrice: productData?.products?.minPrice || 0,
      maxPrice: productData?.products?.maxPrice || 10000,
      category: categoryResponse?.data?.category || {},
      categories: categoriesResponse?.data?.categories?.categories || [],
      products: productData.products.products,
      attributes: productData.products.attributeValues,
      itemsPerPage: 1,
      facets: {},
      perPageOptions: 20,
      totalProducts: productData.products.totalCount
    };
  }
};

export default useFacetFactory<any>(factoryParams);
