<script setup lang="ts">
import { QueryProductVariantArgs, ProductVariantQueryResponse, MutationLoginArgs, LoginMutationResponse } from '~/graphql'
import { QueryName } from '~/server/queries';
import { MutationName } from '~/server/mutations';

const { $sdk } = useNuxtApp();

const { data } = await $sdk().odoo.query<QueryProductVariantArgs, ProductVariantQueryResponse>({ queryName: QueryName.ProductVariantQuery }, {
  productTemplateId: 39,
  combinationId: [12, 305]
});

console.log(data.productVariant.displayName);

const { data: dataMut } = await $sdk().odoo.mutation<MutationLoginArgs, LoginMutationResponse>({ mutationName: MutationName.LoginMutation }, {
  email: "test@odoo.com",
  password: "123"
});


</script>

<template>
  <div>
    <MainBanner />

  </div>
</template>
