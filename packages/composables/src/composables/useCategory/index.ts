import { Context, useCategoryFactory, UseCategoryFactoryParams} from '@vue-storefront/core';
import { Category, GraphQlGetCategoryParams} from '@vue-storefront/odoo-api';

const params: UseCategoryFactoryParams<Category, GraphQlGetCategoryParams> = {
  categorySearch: async (context: Context, params) => {

    const { data } = await context.$odoo.api.getCategory(params);

    return data.categories.categories;
  }
};

export default useCategoryFactory<Category, GraphQlGetCategoryParams>(params);
