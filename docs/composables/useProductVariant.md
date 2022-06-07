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

```ts
// searchRealProduct input
type GraphQlGetProductVariantParams = {
  productTemplateId: number;
  combinationId: string[];
};
```

## Example

```ts
import { useProductVariant } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { searchRealProduct, realProduct } = useProductVariant();


    onSSR(async () => {
      await searchRealProduct({
        productId: id,
        combinationIds: [1,2,3], // list of variant combination ids,
        customQuery: { getRealProduct: 'customRealProductQuery' }
      });
      await search({ id });

    });

    return {
      realProduct
    }
  }
}
```