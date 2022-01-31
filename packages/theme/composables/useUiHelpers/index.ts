/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { useRoute, useRouter } from '@nuxtjs/composition-api';
import { Category } from '@vue-storefront/odoo-api/server';

const queryParamsNotFilters = ['page', 'sort', 'itemsPerPage'];

const useUiHelpers = (): any => {
  const route = useRoute();
  const router = useRouter();
  const { params, query } = route.value;

  const getFacetsFromURL = () => {

    let filters: string[] = [];
    if (query) {
      Object.keys(query).forEach((filterKey) => {
        if (!queryParamsNotFilters.includes(filterKey)) {
          console.log(query);

          // filters.push(query[filterKey]);
        }
      });

      filters = filters.map((filter) => filter.split(',')).flat();
    }

    const pageSize = 10;
    // query.itemsPerPage ? parseInt(query.itemsPerPage) : 10;
    const sort = '1' as any;
    // query?.sort?.split(',') || [];
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
        attributeValueId: filters
      }
    };
  };

  const getCatLink = (category: Category): string => {
    const { params, query } = route.value;

    const sort = query.sort ? `?sort=${query.sort}` : '';

    return `/c/${params.slug_1}/${category.slug}/${category.id}${sort}`;
  };

  const getCatLinkForSearch = (category: Category): string => {
    const splitedSlug = category.slug.split('-');

    return `/c/${splitedSlug[0]}/${category.slug}/${category.id}`;
  };

  const changeSorting = (sort: string) => {
    router.push({ query: { ...query, sort } });
  };

  const facetsFromUrlToFilter = () => {
    const formatedFilters = [];
    Object.keys(query).forEach((label) => {
      if (queryParamsNotFilters.includes(label)) return;

      const valueList = [];
      // query[label].split(',');

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

    router.push({ query: formatedFilters });
  };

  const changeItemsPerPage = (itemsPerPage) => {
    delete query.page;
    router.push({ query: { ...query, itemsPerPage } });
  };

  const changeSearchTerm = (term: string) => term;

  const isFacetColor = (facet): boolean => {
    return facet.display_type === 'color';
  };

  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getComponentProviderByName = (name: string): string => {
    if (!name) throw new Error('Provider without name');

    const upperName = name.toLocaleUpperCase();

    if (upperName.includes('ADYEN')) {
      return 'AdyenExternalPaymentProvider';
    }

    if (upperName.includes('WIRE')) {
      return 'WireTransferPaymentProvider';
    }

    throw new Error(`Provider ${name} not implemented!`);
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
    facetsFromUrlToFilter,
    getComponentProviderByName
  };
};

export default useUiHelpers;
