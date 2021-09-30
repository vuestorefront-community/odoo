import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import {
  Category,
  GraphQlGetCategoryParams
} from '@vue-storefront/odoo-api/src/types';

const params: UseCategoryFactoryParams<Category, GraphQlGetCategoryParams> = {
  categorySearch: async (context: Context, params) => {
    const { categories } = await context.$odoo.api.getCategory(params);

    return categories.categories;
  }
};

export default useCategoryFactory<Category, GraphQlGetCategoryParams>(params);
