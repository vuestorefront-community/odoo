import { Context, useFacetFactory } from '@vue-storefront/core';
import { GraphQlGetCategoryParams, SearchResultParams, GraphQlGetProductParams, ParamsFromUrl, ProductSortInput} from '@vue-storefront/odoo-api/src/types/types';
import { FacetResultsData } from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: SearchResultParams<ParamsFromUrl>): Promise<FacetResultsData> => {
    const categoryParams: GraphQlGetCategoryParams = {
      pageSize: 100,
      search: params.input.search,
      filter: { parent: false, id: params?.input?.filter?.categoryId || null }
    };

    const productParams: GraphQlGetProductParams = {
      pageSize: params.input.pageSize,
      currentPage: params.input.currentPage,
      search: params.input.search,
      sort: params.input.sort as ProductSortInput,
      filter: {
        categoryId: params?.input?.filter?.categoryId,
        attributeValueId: params.input?.filter?.attributeValueId?.map(id => parseInt(id))
      }

    };

    const { data } = await context.$odoo.api.getCategory(categoryParams, params?.customQuery);

    const { data: productData } = await context.$odoo.api.getProductTemplatesList(productParams);

    return {
      categories: data.categories.categories,
      products: productData.products.products,
      attributes: productData.products.attributes,
      itemsPerPage: 1,
      facets: {},
      perPageOptions: 20,
      totalProducts: productData.products.totalCount
    };
  }
};

export default useFacetFactory<any>(factoryParams);
