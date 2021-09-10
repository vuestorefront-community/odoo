/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgnosticBreadcrumb,
  AgnosticCategoryTree,
  AgnosticFacet,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  FacetsGetters
} from '@vue-storefront/core';
import { Category, Product } from '@vue-storefront/odoo-api/src/types';
import { FacetResultsData, SearchData } from '../types';
import CategoryGetters from './categoryGetters';
const getAll = (
  searchData: SearchData,
  criteria?: string[]
): AgnosticFacet[] => [];

const isNumeric = (num) => !isNaN(num);

const getGrouped = (
  searchData: SearchData,
  criteria?: string[]
): AgnosticGroupedFacet[] => {
  if (!searchData?.data?.attributes) return [];

  const formatedAttribute = searchData?.data?.attributes.map((attribute) => ({
    id: String(attribute.id),
    label: attribute.name,
    count: 0,
    options: attribute.values.map((value) => ({
      type: '',
      id: String(value.search),
      value: value.id,
      label: value.name,
      metadata: value.search
    }))
  }));

  return formatedAttribute;
};

const getSortOptions = (searchData: SearchData): AgnosticSort => ({
  options: [
    {
      id: 'list_price desc',
      value: 'price,DESC',
      attrName: 'Price: High to Low',
      type: ''
    },
    {
      id: 'list_price asc',
      value: 'price,ASC',
      attrName: 'Price: Low to High',
      type: ''
    },
    { id: 'name asc', value: 'name,ASC', attrName: 'Name: A to Z', type: '' },
    { id: 'name desc', value: 'name,DESC', attrName: 'Name: Z to A', type: '' }
  ],
  selected: searchData.input.sort || 'name asc'
});

const getCategoryTree = (searchData: SearchData): AgnosticCategoryTree => {
  if (!searchData?.data?.categories) {
    return [] as any;
  }

  const categories = searchData.data.categories;
  let parentCategory: Category = searchData.data.categories[0];

  if (!categories[0].childs) {
    parentCategory = categories[0].parent.parent;
  }

  return CategoryGetters.getTree(parentCategory);
};

const getProducts = (searchData: SearchData): any => {
  if (!searchData.data) {
    return {} as any;
  }

  const products = searchData.data.products;

  return products as any;
};

const getPagination = (searchData: SearchData): AgnosticPagination => {
  const itemsPerPage = searchData.input?.ppg || 10;

  return {
    currentPage: 1,
    totalPages: Math.ceil(searchData.data?.totalProducts / itemsPerPage) || 1,
    totalItems: searchData.data?.totalProducts,
    itemsPerPage,
    pageOptions: [5, 10, 15, 20]
  };
};

const getBreadcrumbsByProduct = (product: Product): AgnosticBreadcrumb[] => {
  const category = product.categories?.find((cat) => cat.name !== 'All');
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  if (!category) {
    return [];
  }
  const topCategoryParent =
    category.parent === null ? category.id : category.parent?.parent?.id;
  const splited = category.slug?.split('-');
  breadcrumbs.push({
    text: splited[0],
    link: `/c/${splited[0]}/${topCategoryParent}`
  });
  breadcrumbs.push({ text: splited[1], link: '' });

  return breadcrumbs || [];
};

const getBreadcrumbs = ({ input }: SearchData): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  breadcrumbs.push({
    text: input.currentRootCategory.name,
    link: `/c/${input.currentRootCategory.slug}/${input.currentRootCategory.id}`
  });

  if (input.params.slug_2 && !isNumeric(input.params.slug_2)) {
    const splited = input.params.slug_2.split('-');
    breadcrumbs.push({ text: splited[2], link: '' });
  }

  return breadcrumbs;
};

const facetGetters: FacetsGetters<FacetResultsData, any> = {
  getBreadcrumbsByProduct,
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
