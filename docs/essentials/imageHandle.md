
# Image handle
Always use the **getImage** method!

### WHY ? 
- He is build to fetch from correct baseURL (CDN for production / odoo others)
- He is already injected in vue

### HOW ?

```ts
   // from template
   $image(productGetters.getCoverImage(product))
   $image( <image url> )

   // from setup
   { url: root.$image(img.small) }

```

### Example 1
```html
  <SfCollectedProduct
    v-for="product in products"
    :key="wishlistGetters.getItemSku(product)"
    :image="$image(wishlistGetters.getItemImage(product))"
    :title="wishlistGetters.getItemName(product)"
  />

```

### Example 2
```html
  <SfImage
    :src="$image(icon.image)"
    :alt="icon.name || 'icon-image'"
    :width="57"
    :height="25"
  />

```
