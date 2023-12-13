<script setup lang="ts">
import { QueryProductVariantArgs, ProductVariantQueryResponse, MutationLoginArgs, LoginMutationResponse } from '~/graphql';
import { QueryName } from '~/server/queries';
import { MutationName } from '~/server/mutations';

const { $sdk } = useNuxtApp();

// onMounted(async () => {
const data = await $sdk().odoo.query<QueryProductVariantArgs, any>({ queryName: QueryName.GetProductTemplateList }, {});

console.log(data);

const asa = await $sdk().odoo.query<QueryProductVariantArgs, any>({ queryName: QueryName.GetCategories }, {});

console.log(asa);
// });

</script>

<template>
  <div>
    <button @click="go">Go</button>
    <MainBanner />

  </div>
</template>
