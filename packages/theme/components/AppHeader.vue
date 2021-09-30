<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{
        'header-on-top': isSearchOpen,
        'sf-header--multiline': topCategories.length > 7,
      }"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #navigation>
        <div class="grid grid-cols-6 auto-cols-min">
          <SfHeaderNavigationItem
            v-for="(category, index) in topCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :link="localePath(`/c/${category.slug}/${category.id}`)"
          />
        </div>
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon
              :icon="accountIcon"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              :icon="wishlistHasItens ? 'heart_fill' : 'heart'"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleCartSidebar"
          >

            <SfIcon
              class="sf-header__icon "
              icon="empty_cart"
              size="1.25rem"
            />

            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
            >{{ cartTotalItems }}</SfBadge>
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          v-click-outside="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon
                  color="var(--c-text)"
                  size="18px"
                  icon="cross"
                />
              </span>
            </SfButton>
            <SfButton
              v-else
              class="sf-search-bar__button sf-button--pure"
              @click="
                isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
              "
            >
              <span class="sf-search-bar__icon">
                <SfIcon
                  color="var(--c-text)"
                  size="20px"
                  icon="search"
                />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="formatedResult"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
  SfOverlay,
  SfBadge,
  SfHeader
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  categoryGetters,
  useCategory,
  useFacet
} from '@vue-storefront/odoo';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { computed, ref, watch } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';

import debounce from 'lodash.debounce';
import { mapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';
export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    LocaleSelector,
    SearchResults,
    SfOverlay,
    SfBadge
  },
  directives: { clickOutside },
  setup (props, { root }) {
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);

    const { changeSearchTerm } = useUiHelpers();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { load: loadWishlist, wishlist } = useWishlist();
    const { search: searchProductApi, result } = useFacet('AppHeader:Search');
    const { categories: topCategories, search: searchTopCategoryApi } = useCategory('AppHeader:TopCategories');

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const removeSearchResults = () => {
      formatedResult.value = null;
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      if (term.value.length < 2) return;

      await searchProductApi({ search: term.value, pageSize: 12 });

      formatedResult.value = {
        products: result?.value?.data?.products,
        categories: result?.value?.data?.categories
          .filter(category => category.childs === null)
          .map((category) =>
            categoryGetters.getTree(category)
          )
      };
    }, 100);
    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );

    onSSR(async () => {
      await Promise.all([
        searchTopCategoryApi({ filter: { parent: true }}),
        loadUser(),
        loadWishlist(),
        loadCart()
      ]);
    });

    return {
      wishlistHasItens: computed(() => wishlist.value?.wishlistItems.length > 0),
      topCategories,
      accountIcon,
      closeOrFocusSearchBar,
      cartTotalItems,
      removeSearchResults,
      isSearchOpen,
      searchBarRef,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      formatedResult,
      term,
      isMobile,
      handleSearch,
      closeSearch
    };
  }
};
</script>

<style lang='scss' scoped >
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
</style>
