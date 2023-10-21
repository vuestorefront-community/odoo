<script setup lang="ts">
import { QueryProductVariantArgs, ProductVariantQueryResponse, MutationLoginArgs, LoginMutationResponse } from '~/graphql'
import { QueryName } from '~/server/queries';
import { MutationName } from '~/server/mutations';

const { $sdk } = useNuxtApp();

const go = async () => {
  const { data } = await $sdk().odoo.mutation<MutationLoginArgs, LoginMutationResponse>({ mutationName: MutationName.LoginMutation }, {
    email: "ergap@odoo.com",
    password: "123"
  });

  console.log(data?.login);

  const { data: asa } = await $sdk().odoo.query<QueryProductVariantArgs, ProductVariantQueryResponse>({ queryName: QueryName.LoadUserQuery }, {});

  console.log(asa.productVariant.displayName);
};


</script>

<template>
  <div>
    <button @click="go">Go</button>
    <MainBanner />

  </div>
</template>
