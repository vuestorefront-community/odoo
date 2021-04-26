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
import { getCategoryTree as buildCategoryTree } from './categoryGetters';

const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => [];

const getSortOptions = (searchData): AgnosticSort => ({ options: [], selected: '' });

const getCategoryTree = (searchData): AgnosticCategoryTree => {
  if (!searchData.data) {
    return {} as any;
  }

  const categories = searchData.data.categories;
  const formattedCategories = {
    items: categories.map(category => buildCategoryTree(category))
  };

  return formattedCategories as any;
};

const getProducts = (searchData): any => {
  if (!searchData.data) {
    return {} as any;
  }

  const products = searchData.data.products;

  return products as any;
};

const getPagination = (searchData): AgnosticPagination => ({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  pageOptions: []
});

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
