<script lang="ts" setup>
import { OrderLine } from '@erpgap/odoo-sdk-api-client';
import { sdk } from '../../sdk.config';

const props = defineProps({
    orderLine: {
        type: Object as PropType<OrderLine>,
        required: true,
    }
})

const handleRemoveFromCart = async () => {
    await sdk.odoo.cartRemove({ lineId: props.orderLine.id })
}


</script>
<template>
    <li class="flex py-6">
        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img :src="$getImage(orderLine.product?.image || '', 200, 200, orderLine.product?.imageFilename || '')"
                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                class="h-full w-full object-cover object-center">
        </div>

        <div class="ml-4 flex flex-1 flex-col">
            <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                        <a href="#">{{ orderLine.product?.name }}</a>
                    </h3>
                </div>
                <p class="mt-1 text-sm text-gray-500">Blue</p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Qty 1</p>

                <div class="flex">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"
                        @click="handleRemoveFromCart">Remove</button>
                </div>
            </div>
        </div>
    </li>
</template>


