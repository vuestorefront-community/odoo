<script lang="ts" setup>
import { sdk } from '../sdk.config';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  }
})

const handleAddToCart = async () => {
  if (props.product?.firstVariant?.id)
    await sdk.odoo.addToCart({ productId: props.product.firstVariant.id, quantity: 1 }, { 'addToCart': '123' });
}


import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';
import { Product } from '@erpgap/odoo-sdk-api-client';
</script>
<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
    <div class="relative">
      <SfLink href="#">
        <img :src="`https://vsfdemo15.labs.odoogap.com${product.image}`" alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square" :width="300" :height="300" />
      </SfLink>
      <SfButton type="button" variant="tertiary" size="sm" square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
        aria-label="Add to wishlist">
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink href="#" variant="secondary" class="no-underline"> {{ product.name }} </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink href="#" variant="secondary" class="pl-1 no-underline">
          <SfCounter size="xs">123</SfCounter>
        </SfLink>
      </div>
      <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
        Lightweight • Non slip • Flexible outsole • Easy to wear on and off
      </p>
      <span class="block pb-2 font-bold typography-text-lg">$2345,99</span>
      <SfButton type="button" size="sm" @click="handleAddToCart">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>
  

  