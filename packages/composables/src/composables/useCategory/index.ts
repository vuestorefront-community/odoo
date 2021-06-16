import { Context, useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';

import { Category } from '../types';
const params: UseCategoryFactoryParams<Category, any> = {

  categorySearch: async (context: Context, params) => {
    const { customQuery, ...searchParams } = params;
    const categories = await context.$odoo.api.getCategory(searchParams, customQuery);
    return categories;
  }
};

export default useCategoryFactory<Category, any>(params);
