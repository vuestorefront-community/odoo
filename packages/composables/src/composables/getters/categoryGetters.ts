import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@vue-storefront/odoo-api/src/types';

const itemToTree = (category: Category): AgnosticCategoryTree => {
  return {
    label: category.name,
    slug: category.slug,
    parent: category.parent,
    items: [],
    isCurrent: false,
    id: category.id
  };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (category: Category): AgnosticCategoryTree => {
  if (category) {
    return itemToTree(category);
  }
  return {} as AgnosticCategoryTree;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree
};

export default categoryGetters;
