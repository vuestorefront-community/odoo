import { Context, useFacetFactory } from '@vue-storefront/core';
import { GraphQlGetCategoryParams, SearchResultParams, GraphQlGetProductParams, ParamsFromUrl, ProductSortInput} from '@vue-storefront/odoo-api/src/types/types';
import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: SearchResultParams<ParamsFromUrl>): Promise<FacetResultsData> => {

    const { customQueryProducts, customQueryCategories } = params.input;
    const categoryParams: GraphQlGetCategoryParams = {
      pageSize: 100,
      search: params.input.search,
      filter: params?.input?.filter
    };

    const productParams: GraphQlGetProductParams = {
      pageSize: params.input.pageSize,
      currentPage: parseInt(params.input.currentPage) || 1,
      search: params.input.search,
      sort: params.input.sort as ProductSortInput,

      filter: params?.input?.filter
    };

    let categoryResponse = null;
    if (params.input.fetchCategory) {
      categoryResponse = await context.$odoo.api.getCategory(categoryParams, customQueryCategories);
    }

    const { data: productData } = await context.$odoo.api.getProductTemplatesList(productParams, customQueryProducts);

    return {
      minPrice: productData?.products?.minPrice || 0,
      maxPrice: productData?.products?.maxPrice || 10000,
      categories: categoryResponse?.data?.categories?.categories || null,
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
