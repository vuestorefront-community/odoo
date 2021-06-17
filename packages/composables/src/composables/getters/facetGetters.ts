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

const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => {

  const formatedAttribute = searchData?.data?.attributes.map(attribute => ({
    id: attribute.id,
    label: attribute.name,
    count: 0,
    options: attribute.values.map(value => ({
      id: value.search,
      value: value.id,
      label: value.name,
      metadata: value.search
    }))
  }));

  return formatedAttribute;
};

const getSortOptions = (searchData): AgnosticSort => ({
  options: [
    { value: 'list_price desc', label: 'Price: High to Low', type: '' },
    { value: 'list_price asc', label: 'Price: Low to High', type: '' },
    { value: 'name asc', label: 'Name: A to Z', type: '' },
    { value: 'name desc', label: 'Name: Z to A', type: '' }
  ],
  selected: searchData || 'name asc'
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
  const itemsPerPage = searchData.input?.ppg || 10;

  return {
    currentPage: 1,
    totalPages: Math.ceil(searchData.data?.totalProducts / itemsPerPage) || 1,
    totalItems: searchData.data?.totalProducts,
    itemsPerPage,
    pageOptions: [5, 10, 15, 20]
  };
};

const getBreadcrumbs = (params): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '#' }];

  if (params.slug_1) {
    breadcrumbs.push({ text: params.slug_1, link: '#' });
  }
  if (params.slug_2) {
    const splited = params.slug_2.split('-');
    breadcrumbs.push({ text: splited[1], link: `/c/${params.slug_1}/${splited[0]}-${splited[1]}-all` });
    breadcrumbs.push({ text: splited[2], link: '' });
  }

  return breadcrumbs;
};

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
