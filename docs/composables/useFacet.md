# UseFacet Composable
**UseFacet** composable can be used to:

- search product list with **pagination** and **attributes**
- search categories
- both will be filtered by the uiHelper

## API

```ts
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
        await search(th.getFacets());
    });

    return {
      result
    }
  }
}
```