<script setup lang="ts">
import { Product } from '@vue-storefront/integration-odoo-api';
import { sdk } from '../../sdk.config';

const products = useState<Product[]>('counter', () => [])

if (products.value.length === 0) {
    const { data } = await useAsyncData('counter', async () => await sdk.odoo.getProductTemplateList({ pageSize: 12, filter: { categoryId: [13] } }));
    products.value = data.value?.data.products?.products || [];
}



</script>
<template>
    <div>
        <Breadcrumb class="self-start mb-10" />
        <div class="flex flex-row items-stretch ">
            <CategoryFilterSidebar class="mr-10" />

            <div class="flex flex-row flex-wrap justify-between">
                <ProductCard v-for="product in products" class="mb-4" :product="product" />
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>