import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@vue-storefront/odoo-api';

const buildTree = (categories: Category[]): AgnosticCategoryTree[] => {
  if (!categories) {
    return [] as AgnosticCategoryTree[];
  }

  return categories.map((category) => ({
    label: category.name,
    slug: category.slug,
    items: buildTree(category.childs),
    isCurrent: false,
    id: category.id
  }));
};

const itemToTree = (category: Category): AgnosticCategoryTree => {
  return {
    label: category.name,
    slug: category.slug,
    items: buildTree(category.childs),
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
