<script lang="ts" setup>
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
  useDisclosure
} from '@storefront-ui/vue';

const { $sdk } = useNuxtApp();

import { CartData } from '~/graphql';
const { toggle } = useDisclosure();
const cartDrawerOpen = useState('cartDrawer', () => false);

const cart = useState<CartData>('cart', () => { })

const actionItems = [
  {
    icon: SfIconShoppingCart,
    ariaLabel: 'Cart',
    role: 'button',
    label: '',
    action: async () => {
      cartDrawerOpen.value = !cartDrawerOpen.value
      const { data } = await $sdk().odoo.cartLoad()
      cart.value = data?.cart || {}
    }
  },
  {
    icon: SfIconFavorite,
    ariaLabel: 'Wishlist',
    role: 'button',
    label: '',
  },
  {
    label: 'Log in',
    icon: SfIconPerson,
    ariaLabel: 'Log in',
    role: 'login',
  },
];

const inputValue = ref('');

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};
</script>

<template>
  <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
    <div class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1336px] w-full">
      <NuxtLink to="/" aria-label="SF Homepage"
        class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0">
        <picture>
          <source srcset="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo.svg"
            media="(min-width: 768px)" />
          <img src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
            alt="Sf Logo" class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]" />
        </picture>
      </NuxtLink>
      <SfButton aria-label="Open categories" class="lg:hidden order-first lg:order-1 mr-4" square variant="tertiary">
        <SfIconMenu />
      </SfButton>
      <nuxt-link to="/category/1">
        <SfButton class="hidden lg:flex lg:mr-4" type="button" variant="tertiary" @click="toggle()">
          <template #suffix>
            <SfIconExpandMore class="hidden lg:block" />
          </template>
          <span class="hidden lg:flex whitespace-nowrap">Browse products</span>
        </SfButton>
      </nuxt-link>
      <form role="search" class="flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        @submit.prevent="search">
        <SfInput v-model="inputValue" type="search" class="[&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search" wrapper-class="flex-1 h-10 pr-0" size="base">
          <template #suffix>
            <span class="flex items-center">
              <SfButton variant="tertiary" square aria-label="search" type="submit"
                class="rounded-l-none hover:bg-transparent active:bg-transparent">
                <SfIconSearch />
              </SfButton>
            </span>
          </template>
        </SfInput>
      </form>
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <SfButton v-for="actionItem in actionItems" :key="actionItem.ariaLabel" @click="actionItem.action"
            class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
            :aria-label="actionItem.ariaLabel" variant="tertiary" square>
            <template #prefix>
              <Component :is="actionItem.icon" />
            </template>
            <span v-if="actionItem.role === 'login'" class="hidden xl:inline-flex whitespace-nowrap">{{
              actionItem.label
            }}</span>
          </SfButton>
        </div>

      </nav>
    </div>
  </header>
</template>
