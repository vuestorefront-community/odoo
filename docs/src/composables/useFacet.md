# UseFacet Composable
**UseFacet** composable can be used to:

- search product list with **pagination** and **attributes**
- search categories
- both will be filtered by the uiHelper

## API

```ts
type FacetSearchResult = {
  categories: Category[]
  products: Product[]
  attributes: Attribute[]
  totalProducts: number
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