<script setup lang="ts">
import { sdk } from '../sdk.config';

const { data } = await useAsyncData('ttt', async () => await sdk.odoo.getCountries())

</script>

<template>
  <div>
    <MainBanner />

  </div>
</template>
