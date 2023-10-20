<template>
<transition
                enter-active-class="transform transition duration-500 ease-in-out"
                leave-active-class="transform transition duration-500 ease-in-out"
                enter-from-class="-translate-x-full md:translate-x-0 md:opacity-0"
                enter-to-class="translate-x-0 md:translate-x-0 md:opacity-100"
                leave-from-class="translate-x-0 md:opacity-100"
                leave-to-class="-translate-x-full md:translate-x-0 md:opacity-0"
              >
                <SfDrawer
                  ref="drawerRef"
                  v-model="isOpen"
                  disable-click-away
                  placement="top"
                  class="grid grid-cols-1 md:gap-x-6 md:grid-cols-4 bg-white max-w-xs shadow-lg p-0 !fixed max-h-screen overflow-y-auto md:!absolute md:!top-[5rem] md:max-w-full md:p-6"
                >
                  <div class="flex items-center justify-between py-2 px-4 bg-primary-700 md:hidden">
                    <div class="flex items-center typography-text-lg font-medium text-white">Browse products</div>
                    <SfButton
                      square
                      variant="tertiary"
                      aria-label="Close navigation menu"
                      class="text-white"
                      @click="close()"
                      @keydown.enter.space="close()"
                    >
                      <SfIconClose />
                    </SfButton>
                  </div>
                  <div
                    v-for="{ heading, items } in categoriesContent"
                    :key="heading"
                    class="[&:nth-child(2)]:pt-0 pt-6 md:pt-0"
                  >
                    <h2
                      role="presentation"
                      class="typography-text-base font-medium text-neutral-900 whitespace-nowrap p-4 md:py-1.5"
                    >
                      {{ heading }}
                    </h2>
                    <hr class="mb-3.5" />
                    <ul>
                      <li v-for="item in items" :key="item.title">
                        <SfListItem
                          tag="a"
                          :href="item.link"
                          size="sm"
                          role="none"
                          class="typography-text-base md:typography-text-sm py-4 md:py-1.5"
                        >
                          {{ item.title }}
                        </SfListItem>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="flex flex-col items-center justify-center bg-neutral-100 md:rounded-md border-neutral-300 overflow-hidden grow"
                  >
                    <img :src="bannerDetails.image" :alt="bannerDetails.title" class="object-contain" />
                    <p class="mb-4 mt-4 px-4 text-center typography-text-base font-medium">{{ bannerDetails.title }}</p>
                  </div>
                  <SfButton
                    square
                    size="sm"
                    variant="tertiary"
                    aria-label="Close navigation menu"
                    class="hidden md:block md:absolute md:right-0 hover:bg-white active:bg-white"
                    @click="close()"
                  >
                    <SfIconClose class="text-neutral-500" />
                  </SfButton>
                </SfDrawer>
              </transition>
</template>
<script lang="ts" setup>
import {
  SfButton,
  SfDrawer,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconClose,
  SfIconExpandMore,
  SfListItem,
  useDisclosure,
  useTrapFocus,
} from '@storefront-ui/vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const { isOpen, toggle, close } = useDisclosure();
const menuRef = ref();
const drawerRef = ref();

useTrapFocus(drawerRef, {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
});
onClickOutside(menuRef, () => {
  close();
});

const actionItems = [
  {
    icon: SfIconShoppingCart,
    label: '',
    ariaLabel: 'Cart',
    role: 'button',
  },
  {
    icon: SfIconFavorite,
    label: '',
    ariaLabel: 'Wishlist',
    role: 'button',
  },
  {
    icon: SfIconPerson,
    label: 'Log in',
    ariaLabel: 'Log in',
    role: 'login',
  },
];
const bannerDetails = {
  image: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/watch.png',
  title: 'New in designer watches',
};

const categoriesContent = [
  {
    heading: 'Women',
    items: [
      {
        title: "All Women's",
        link: '#',
      },
      {
        title: 'Clothing',
        link: '#',
      },
      {
        title: 'Shoes',
        link: '#',
      },
      {
        title: 'Accessories',
        link: '#',
      },
      {
        title: 'Wearables',
        link: '#',
      },
      {
        title: 'Food & Drinks',
        link: '#',
      },
    ],
  },
  {
    heading: 'Men',
    items: [
      {
        title: 'All Men’s',
        link: '#',
      },
      {
        title: 'Clothing',
        link: '#',
      },
      {
        title: 'Shoes',
        link: '#',
      },
      {
        title: 'Accessories',
        link: '#',
      },
      {
        title: 'Wearables',
        link: '#',
      },
      {
        title: 'Food & Drinks',
        link: '#',
      },
    ],
  },
  {
    heading: 'Kids',
    items: [
      {
        title: 'All Kids',
        link: '#',
      },
      {
        title: 'Clothing',
        link: '#',
      },
      {
        title: 'Shoes',
        link: '#',
      },
      {
        title: 'Accessories',
        link: '#',
      },
      {
        title: 'Wearables',
        link: '#',
      },
      {
        title: 'Food & Drinks',
        link: '#',
      },
    ],
  },
];
</script>
