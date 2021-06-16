/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';

const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => [];

const getSortOptions = (searchData): AgnosticSort => ({
  options: [
    { id: 'list_price desc', value: 'Category price: High to Low', type: '' },
    { id: 'list_price asc', value: 'Category price: Low to High', type: '' },
    { id: 'name desc', value: 'Name: A to Z', type: '' },
    { id: 'name asc', value: 'Name: Z to A', type: '' }
  ],
  selected: searchData
});

const getCategoryTree = (searchData): AgnosticCategoryTree => {
  if (!searchData.data) {
    return [] as any;
  }

  const categories = searchData.data.categories;

  const categoriesWithParents = categories.filter((item) => item.parent);
  const parents = categoriesWithParents.map((item) => item.parent).flat();
  const currentParentSelected = parents.find(item => item.slug === searchData.input.term);

  if (!currentParentSelected) {
    return [] as any;
  }

  const uniqueParents = categoriesWithParents.filter(item => {
    return item.parent[0].id === currentParentSelected.id;
  });

  uniqueParents.forEach(parent => {
    parent.childs = categoriesWithParents.filter(item => item.parent[0].id === parent.id);
  });

  return uniqueParents as any;
};

const getProducts = (searchData): any => {
  if (!searchData.data) {
    return {} as any;
  }

  const products = searchData.data.products;

  return products as any;
};

const getPagination = (searchData): AgnosticPagination => {
  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: searchData.data?.totalProducts,
    itemsPerPage: 10,
    pageOptions: []
  };
};

const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] => [];

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
