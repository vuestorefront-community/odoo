# UseProduct Composable
**UseProduct** composable can be used to:

- Search published products, related products

## API

```ts
type Product = {
  id: number
  description: string
  categoriesRef: string[]
  defaultCode: string
  name: string
  slug: string
  sku: string
  image: string
  price: number
  listPrice: number
  realProduct: any
  firstVariantId: number // attribute from graphql
  first_variant_id: number // attribute from jsonrpc
  attributes: Attribute[]
}
```


## Example
```ts
import { useProduct } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search } = useProduct('products');

    onSSR(async () => {
      await search({ id });
    });

    return {
      product
    }
  }
}
```