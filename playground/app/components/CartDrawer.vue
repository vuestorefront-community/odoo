<script lang="ts" setup>
import { SfDrawer, SfDrawerPlacement, SfButton, SfIconFavorite, SfIconClose, useTrapFocus } from '@storefront-ui/vue';
import { ref } from 'vue';

const placement = ref<`${SfDrawerPlacement}`>('right');
const open = useState('cartDrawer', () => false);
const drawerRef = ref();
const cart = useState<CartData>('cart', () => { })

useTrapFocus(drawerRef, { activeState: open });
</script>
<template>
    <SfButton type="button" @click="open = true"> Open Drawer </SfButton>

    <transition enter-active-class="transition duration-500 ease-in-out"
        leave-active-class="transition duration-500 ease-in-out" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <SfDrawer ref="drawerRef" v-model="open" :placement="placement" :class="[
            'bg-neutral-50',
            'border',
            'border-gray-300',
            { 'max-w-[370px]': placement === 'left' || placement === 'right' },
        ]">
            <header class="flex items-center justify-between px-10 py-6 bg-primary-700">
                <div class="flex items-center text-white">
                    <SfIconFavorite class="mr-2" /> Your Cart Items
                </div>
                <SfButton square variant="tertiary" class="text-white" @click="open = false">
                    <SfIconClose />
                </SfButton>
            </header>
            <div class="p-5 px-10">
                {{ cart. }}
            </div>
        </SfDrawer>
    </transition>
</template>


