# UseFacet Composable

::: tip Base  (Methods, Interfaces, Properties)
[VSF useFacet](https://docs.vuestorefront.io/v2/reference/api/core.usefacet.html)
:::
## Features
- search product list with **pagination** and **attributes**
- search categories
- both will be filtered by the uiHelper

## API

```ts
// Input params
export type Params = {
  filter: ParamsFromUrlFilterInput;
  currentPage: number;
  pageSize: number;
  search: string;
  categorySlug?: string;
  sort: ProductSortInput;
  customQueryProducts: any;
  customQueryCategories: any;
  fetchCategory?: boolean; // false = fetch only products
};

export type ParamsFromUrlFilterInput = {
  categoryId?: number;
  attributeValueId: number[];
  minPrice: string;
  maxPrice: string;
};

export type ProductSortInput = {
  id?: SortEnum;
  price?: SortEnum;
};

export enum SortEnum {
  ASC,
  DESC
}
```

```ts
// Response
type FacetSearchResult = {
  minPrice: number;
  maxPrice: number;
  products: Product[];
  categories: Category[];
  facets: Record<string, string>;
  totalProducts: number;
  perPageOptions: number;
  itemsPerPage: number;
  attributes: AttributeValue[];
}
```

## Example

```ts
import { useFacet } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'
import { useUiHelpers } from '~/composables';

export default {
  setup () {
    const th = useUiHelpers();
    const { result, search, loading } = useFacet();

    onSSR(async () => {
        await search(th.getFacets()); // VSF default example, helpers will organize the url params and pass to search

        await search({
          search: 'shirt',
          pageSize: 12,
          currentPage: 1,
          fetchCategory: true,
          customQueryProducts: { getProductTemplatesList: 'customProductListQuery' } // Optional custom query
          customQueryProducts: { getProductTemplatesList: 'customProductListQuery' } // Optional custom query
        });
    });

    return {
      products: computed(() => result.value?.data?.products),
      categories: computed(() => result.value?.data?.categories),
      total: computed(() => result?.value?.data?.totalProducts),
      result
    }
  }
}
```