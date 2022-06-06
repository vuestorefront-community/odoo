# UseCategory Composable

### Base Methods, Interfaces, Properties  [VSF useCategory](https://docs.vuestorefront.io/v2/reference/api/core.usecategory.html)
## Features
**UseCart** composable can be used to:

* search a list of categories.

## API
A **Category** in odoo can have a parent.

```ts
type Category = {
  id: number;
  name: string;
  slug: string;
  parent?: Category;
  childs?: Category[];
  products?: Product[];
}
```

## Params 
The base Graphql params is

```ts
export type GraphQlGetCategoryParams = {
  filter: CategoryFilterInput;
  currentPage?: number;
  pageSize?: number;
  search?: string;
  sort?: CategorySortInput;
};

export type CategoryFilterInput = {
  id: number;
  parent: boolean; 
};

export type CategorySortInput = {
  id: SortEnum;
};

export enum SortEnum {
  ASC,
  DESC
}
```

## Example

```ts
import { useCategory } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { search, categories } = useCategory();

    onSSR(async () => {
      await search({
        filter: { parent: true }, // Optional filter
        pageSize: 12, // Optional filter
        customQuery: { getCategory: 'customGetCategoryQuery' } // Optional custom query
      });
    });

    return {
      categories,
      loading
    }
  }
}
```