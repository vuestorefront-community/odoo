<script lang="ts" setup>
import { CartData, OrderLine } from '@erpgap/odoo-sdk-api-client';
import { SfButton, SfIconAdd, SfIconRemove } from '@storefront-ui/vue';

import { sdk } from '../../sdk.config';

const cart = useState<CartData>('cart', () => { })

const props = defineProps({
    orderLine: {
        type: Object as PropType<OrderLine>,
        required: true,
    }
})

const quantity = ref(Number(props.orderLine.quantity))

const handleRemoveFromCart = async () => {
    const { data } = await sdk.odoo.cartRemove({ lineId: props.orderLine.id })
    cart.value = data?.cartRemoveItem || {}
}

const handleUpdateQuantity = async () => {
    await sdk.odoo.cartUpdate({ lineId: props.orderLine.id, quantity: quantity.value })
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
                <p class="text-gray-500">Qty: {{ orderLine.quantity }}</p>

                <div class="flex">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"
                        @click="handleRemoveFromCart">Remove</button>
                </div>


            </div>
            <div class="inline-flex flex-col items-center">
                <div class="flex border border-neutral-300 rounded-md">
                    <SfButton type="button" variant="tertiary" square class="rounded-r-none" :aria-controls="orderLine.id"
                        aria-label="Decrease value" @click="--quantity; handleUpdateQuantity()">
                        <SfIconRemove />
                    </SfButton>
                    <input :id="orderLine.id" v-model="quantity" type="number" role="spinbutton"
                        class="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                        :min="1" :max="10" @input="handleUpdateQuantity" />
                    <SfButton type="button" variant="tertiary" :disabled="orderLine.quantity == 10" square
                        class="rounded-l-none" :aria-controls="orderLine.id" aria-label="Increase value"
                        @click="++quantity; handleUpdateQuantity()">
                        <SfIconAdd />
                    </SfButton>
                </div>
            </div>
        </div>
    </li>
</template>


