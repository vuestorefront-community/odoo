<script setup lang="ts">
import { QueryProductVariantArgs, ProductVariantQueryResponse } from '~/graphql'
import { sdk } from '~/sdk.config';

const { data } = await sdk.odoo.query<QueryProductVariantArgs, ProductVariantQueryResponse>({ queryName: 'productVariantQuery' }, {
  productTemplateId: 39,
  combinationId: [12, 305]
});

console.log(data.productVariant.displayName);

// const { data } = await useAsyncData('ttt', async () => await sdk.odoo.getCountries())

</script>

<template>
  <div>
    <MainBanner />

  </div>
</template>
