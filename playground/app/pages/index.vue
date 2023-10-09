<script setup lang="ts">
import { QueryProductVariantArgs, ProductVariantQueryResponse, MutationLoginArgs, LoginMutationResponse } from '~/graphql'
import { sdk } from '~/sdk.config';
import { QueryName, MutationName } from '@erp-gap/server/src/types';
const { data } = await sdk.odoo.query<QueryProductVariantArgs, ProductVariantQueryResponse>({ queryName: QueryName.ProductVariantQuery }, {
  productTemplateId: 39,
  combinationId: [12, 305]
});

console.log(data.productVariant.displayName);

const { data: dataMut } = await sdk.odoo.mutation<MutationLoginArgs, LoginMutationResponse>({ mutationName: MutationName.LoginMutation }, {
  email: "test@odoo.com",
  password: "123"
});

console.log(dataMut?.login.partner.name);

</script>

<template>
  <div>
    <MainBanner />

  </div>
</template>
