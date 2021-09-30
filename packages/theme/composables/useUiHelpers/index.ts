/* eslint-disable camelcase */
import { getCurrentInstance } from '@vue/composition-api';
import { Category, ParamsFromUrl } from '~/../api-client/src/types';
const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const queryParamsNotFilters = ['page', 'sort', 'itemsPerPage'];

const useUiHelpers = (): any => {
  const instance = getInstance();

  const getFacetsFromURL = (): ParamsFromUrl => {
    const { params, query } = instance.$router.history.current;
    let filters: string[] = [];
    if (query) {
      Object.keys(query).forEach((filterKey) => {
        if (!queryParamsNotFilters.includes(filterKey)) {
          filters.push(query[filterKey]);
        }
      });

      filters = filters.map((filter) => filter.split(',')).flat();
    }

    const pageSize = query.itemsPerPage ? parseInt(query.itemsPerPage) : 10;
    const sort = query?.sort?.split(',') || [];
    const page = query?.page || 1;
    const categoryId = parseInt(params.slug_3) || parseInt(params.slug_2);

    return {
      search: '',
      sort: { [sort[0]]: sort[1] },
      pageSize,
      categorySlug: params.slug_1,
      currentPage: page,
      filter: {
        categoryId,
        attributeValueId: filters.map((item) => parseInt(item))
      }
    };
  };

  const getCatLink = (category: Category): string => {
    const { params, query } = instance.$router.history.current;
    const sort = query.sort ? `?sort=${query.sort}` : '';

    return `/c/${params.slug_1}/${category.slug}/${category.id}${sort}`;
  };

  const getCatLinkForSearch = (category: Category): string => {
    const splitedSlug = category.slug.split('-');

    return `/c/${splitedSlug[0]}/${category.slug}/${category.id}`;
  };

  const changeSorting = (sort: string) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  const facetsFromUrlToFilter = () => {
    const { query } = instance.$router.history.current;
    const formatedFilters = [];
    Object.keys(query).forEach((label) => {
      if (queryParamsNotFilters.includes(label)) return;

      const valueList = query[label].split(',');

      valueList.forEach((value) => {
        const item = {
          filterName: label,
          label: value,
          id: value
        };
        formatedFilters.push(item);
      });
    });

    return formatedFilters;
  };

  const changeFilters = (filters) => {
    const formatedFilters = {};
    filters.forEach((element) => {
      if (formatedFilters[element.filterName]) {
        formatedFilters[element.filterName] += `,${element.id}`;
        return;
      }
      formatedFilters[element.filterName] = element.id;
    });

    instance.$router.push({ query: formatedFilters });
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    const { query } = instance.$router.history.current;
    delete query.page;
    instance.$router.push({ query: { ...query, itemsPerPage } });
  };

  // eslint-disable-next-line
  const changeSearchTerm = (term: string) => term;

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    return facet.display_type === 'color';
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  return {
    getFacetsFromURL,
    getCatLink,
    getCatLinkForSearch,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox,
    facetsFromUrlToFilter
  };
};

export default useUiHelpers;
