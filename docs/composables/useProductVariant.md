# UseProductVariant Composable
**UseProductVariant** composable can be used to:

- Search Variants of a product
- Search the real product variant

```ts
type ProductVariant = {
  attribute_name: string
  attribute_display_type: string
  attribute_value_id: number
  attribute_value_name: string
  attribute_value_html_color: any
  attribute_value_price_extra: number
}

```

## Example

```ts
import { useProductVariant } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const {
      searchVariants,
      searchRealProduct,
      productVariants,
      realProduct,
      elementNames,
    } = useProductVariant();


    onSSR(async () => {
      await searchVariants({ productId: id });
      await searchRealProduct({
        productId: id,
        combinationIds: [1,2,3] // list of variant combination ids,
      });
      await search({ id });

    });

    return {
      realProduct, // the product to add on cart
      productVariants // the variants to create a form
    }
  }
}
```