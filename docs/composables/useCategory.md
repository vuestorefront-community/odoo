# UseCategory Composable


## Features
**UseCart** composable can be used to:

* search a list of categories.
    * the search method accpetsa single params Object.
        ```ts
         term: string // name of category to filter
         topCategory: boolean 
        ```

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

## Example

```ts
import { useCategory } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { categories: topCategories, search, loading } = useCategory();

    onSSR(async () => {
      await search({ topCategory: true});
    });

    return {
      categories,
      loading
    }
  }
}
```