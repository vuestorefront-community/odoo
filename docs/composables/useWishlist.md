# UseWishlist Composable
**UseWishlist** composable can be used to:

- Add item to wishlist
- Remove item from wishlist
- Check if item is on wishlist
- Load wishlist of the user


## API
A **WishlistItem** in odoo
```ts
export declare type WishlistItem = {
  product: Product;
  id: number;
}

export declare type Wishlist = {
  wishlistItems?: WishlistItem[];
};
```

## Example
```ts
import { useWishlist } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { addItemToWishlist, removeItem, isInWishlist, load: loadWishlist } = useWishlist();

    onSSR(async () => {
      await loadWishlist();
    });


    return {
        removeItem,
        addItemToWishlist,
        isInWishlist
    }
  }
}
```