import { getCurrentInstance } from '@vue/composition-api';
import { Category } from '~/../api-client/src/types';
const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { params } = instance.$router.history.current;
    const term = params.slug_1.slice(0, -1);
    return {
      term
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category: Category): string => `/c/${category.label}`;

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
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
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
