# UseProduct Composable
**UseProduct** composable can be used to:

- Search published products, related products

## API

```ts
type Product = {
  id: number;
  description?: string;
  name?: string;
  displayName?: string;
  slug?: string;
  isInStock?: boolean;
  qty?: number;
  sku?: string;
  image?: string;
  variantImage?: string;
  smallImage?: string;
  mediaGallery?: ProductImage[];
  price?: number;
  weight?: number;
  priceAfterDiscount?: number;
  hasDiscountedPrice?: number;
  listPrice?: number;
  realProduct?: ProductVariant;
  firstVariant?: number;
  currency?: Currency;
  isInWishlist?: boolean;
  alternativeProducts?: Product[];
  productVariants?: Product[]
  accessoryProducts?: Product[];
  attributeValues?: AttributeValue[];
  productTemplate?: Product;
  categories?: Category[];
  seoTitle?: string;
  seoDescription?: string;
  imageWebp?: string;
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