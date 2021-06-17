<template>
  <div class="sf-header" :class="{ 'is-sticky': sticky, 'is-hidden': hidden }">
    <div class="sf-header__wrapper">
      <header ref="header" class="sf-header__header">
        <!--@slot Use this slot to replace logo with text or image-->
        <slot name="logo" v-bind="{ logo, title }">
          <SfLink link="/">
            <SfImage
              v-if="logo"
              :src="logo"
              :alt="title"
              class="sf-header__logo"
            />
            <h1 v-else class="sf-header__title">{{ title }}</h1>
          </SfLink>
        </slot>
        <div class="sf-header__aside">
          <!-- @slot Use this slot for language or currency selector -->
          <slot name="aside" />
        </div>
        <div class="sf-header__actions">
          <nav
            class="sf-header__navigation row between-lg"
            :class="{ 'is-visible': isNavVisible }"
          >
            <slot name="navigation"></slot>
          </nav>
          <!--@slot Use this slot to replace default search bar-->
          <slot name="search" v-bind="{ searchValue, searchPlaceholder }">
            <SfSearchBar
              :value="searchValue"
              :placeholder="searchPlaceholder"
              aria-label="Search"
              class="sf-header__search"
              @input="$emit('change:search', $event)"
              @enter="$emit('enter:search', $event)"
            />
          </slot>
          <!--@slot Use this slot to replace default header icons with custom content-->
          <slot
            name="header-icons"
            v-bind="{
              activeIcon,
              cartHasProducts,
              cartItemsQty,
              cartIcon,
              wishlistIcon,
              accountIcon,
            }"
          >
            <div class="sf-header__icons">
              <SfButton
                v-if="accountIcon"
                class="sf-button--pure sf-header__action"
                data-testid="accountIcon"
                @click="$emit('click:account')"
              >
                <SfIcon
                  :icon="accountIcon"
                  size="1.25rem"
                  :class="{
                    'sf-header__icon is-active': activeIcon === 'account',
                  }"
                />
              </SfButton>
              <SfButton
                v-if="wishlistIcon"
                class="sf-button--pure sf-header__action"
                data-testid="wishlistIcon"
                @click="$emit('click:wishlist')"
              >
                <SfIcon
                  class="sf-header__icon"
                  :icon="wishlistIcon"
                  :has-badge="wishlistHasProducts"
                  :badge-label="wishlistItemsQty"
                  size="1.25rem"
                  :class="{
                    'sf-header__icon is-active': activeIcon === 'wishlist',
                  }"
                />
              </SfButton>
              <SfButton
                v-if="cartIcon"
                class="sf-button--pure sf-header__action"
                data-testid="cartIcon"
                @click="$emit('click:cart')"
              >
                <SfIcon
                  class="sf-header__icon"
                  :icon="cartIcon"
                  :has-badge="cartHasProducts"
                  :badge-label="cartItemsQty"
                  size="1.25rem"
                  :class="{
                    'sf-header__icon is-active': activeIcon === 'cart',
                  }"
                />
              </SfButton>
            </div>
          </slot>
        </div>
      </header>
    </div>
  </div>
</template>
<script>
import { SfHeader } from '@storefront-ui/vue';
export default {
  name: 'SfHeader',
  extends: SfHeader,
};
</script>
