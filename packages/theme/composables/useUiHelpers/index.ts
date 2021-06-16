/* eslint-disable camelcase */
import { getCurrentInstance } from '@vue/composition-api';
import { Category } from '~/../api-client/src/types';
const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacets = () => {
    const { params, query } = instance.$router.history.current;
    return {
      term: params.slug_1,
      order: query.sort || 'name asc',
      offset: query.page ? parseInt(query.page) : 1,
      ppg: query.itemsPerPage ? parseInt(query.itemsPerPage) : 10,
      category_id: params.slug_3
    } as any;
  };

  const getFacetsFromURL = () => {
    const { params } = instance.$router.history.current;
    const term = params.slug_1;
    return {
      term
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category: Category): string => {
    const { params, query } = instance.$router.history.current;
    const sort = query.sort ? `?sort=${query.sort}` : '';

    return `/c/${params.slug_1}/${category.slug}/${category.id}${sort}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort: string) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.changeFilters.');
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, itemsPerPage } });
  };

  // eslint-disable-next-line
  const changeSearchTerm = (term: string) => term;

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  return {
    getFacets,
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox
  };
};

export default useUiHelpers;
