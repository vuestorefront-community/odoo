# UseProductVariant Composable
**UseProductVariant** composable can be used to:

- Search Variants of a product
- Search the real product variant

```ts
type ProductVariant = {
  product: Product;
  productTemplateId: number;
  displayName: string;
  displayImage: boolean;
  price: number;
  listPrice: string;
  hasDiscountedPrice: boolean;
  isCombinationPossible: boolean;
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