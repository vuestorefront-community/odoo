<template>
  <div>
    <SfHeader
      data-cy="app-header"
      @click:cart="toggleCartSidebar"
      @click:wishlist="toggleWishlistSidebar"
      @click:account="handleAccountClick"
      @enter:search="changeSearchTerm"
      @change:search="(p) => (term = p)"
      :searchValue="term"
      :cartItemsQty="cartTotalItems"
      :accountIcon="accountIcon"
      class="sf-header--has-mobile-search"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link
          data-cy="app-header-url_logo"
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
        <SfHeaderNavigationItem
          class="nav-item"
          data-cy="app-header-url_women"
          label="WOMEN"
          :link="localePath('/c/women')"
        />
        <SfHeaderNavigationItem
          class="nav-item"
          data-cy="app-header-url_men"
          label="MEN"
          :link="localePath('/c/men')"
        />
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
      <template #search>
        <SfSearchBar
          ref="searchBarRef"
          v-click-outside="closeSearch"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search"
          :value="term"
          @input="handleSearch"
          @keydown.enter.stop="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="18px" icon="cross" />
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
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="result"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  categoryGetters,
  useFacet,
  useProduct,
  useCategory,
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
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
    } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const result = ref(null);
    const searchBarRef = ref(null);
    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const { load: loadWishlist } = useWishlist();
    const { products, search: searchProductApi } = useProduct();
    const { categories, search: searchCategoryApi } = useCategory();

    const term = ref(getFacetsFromURL().term);
    const isSearchOpen = ref(false);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const removeSearchResults = () => {
      result.value = null;
    };
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );
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
      await Promise.all([
        searchProductApi({ itemsPerPage: 12, term: term.value }),
        searchCategoryApi({ itemsPerPage: 6, term: term.value }),
      ]);
      result.value = {
        products: products.value,
        categories: categories.value.map((item) =>
          categoryGetters.getTree(item)
        ),
      };
    }, 300);
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
        isSearchOpen.value = true;
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) isSearchOpen.value = true;
      }
    );

    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
    });

    return {
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
      result,
      term,
      isMobile,
      handleSearch,
      closeSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}
</style>
