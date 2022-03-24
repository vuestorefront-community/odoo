<template>
  <div id="mobileMenu">
    <SfSidebar
      :visible="isMobileMenuOpen"
      :button="false"
      title="Menu"
      @close="toggleMobileMenu"
      class="sidebar sf-sidebar--right"
    >
      <template #title> </template>
      <transition name="fade" mode="out-in"> </transition>
      <template #content-bottom> </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage
} from '@storefront-ui/vue';
import { useUser, productGetters } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';

export default {
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { isAuthenticated } = useUser();

    onSSR(async () => {});

    return {
      isAuthenticated,
      isMobileMenuOpen,
      toggleMobileMenu,
      productGetters
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mobileMenuSideBar.scss';
</style>
