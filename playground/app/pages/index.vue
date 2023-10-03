<script setup lang="ts">
import { ProductInput, Product } from '@erpgap/odoo-sdk-api-client';
import { sdk } from '../sdk.config';

// const { data } = await sdk.odoo.query<ProductInput, Product>({
//   query: `query {
//   product{
//     id
//     name
//   }
// }`,
//   cacheKey: ''
// });

// const { data } = await useAsyncData('ttt', async () => await sdk.odoo.getCountries())

</script>

<template>
  <div>
    <MainBanner />

  </div>
</template>
