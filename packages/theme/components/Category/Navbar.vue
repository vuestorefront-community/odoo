
<template>
  <div class="navbar section">
    <div class="navbar__aside desktop-only">
      <LazyHydrate never>
        <SfHeading :level="3" :title="$t('Categories')" class="navbar__title" />
      </LazyHydrate>
    </div>
    <div class="navbar__main">
      <LazyHydrate on-interaction>
        <SfButton
          class="sf-button--text navbar__filters-button"
          data-cy="category-btn_filters"
          aria-label="Filters"
          @click="toggleFilterSidebar"
        >
          <SfIcon
            size="24px"
            color="dark-secondary"
            icon="filter2"
            class="navbar__filters-icon"
            data-cy="category-icon_"
          />
          {{ $t('Filters') }}
        </SfButton>
      </LazyHydrate>

      <div class="navbar__sort desktop-only">
        <span class="navbar__label">{{ $t('Sort by') }}:</span>
        <LazyHydrate on-interaction>
          <SfSelect
            :value="sortBy.selected"
            placeholder="Select sorting"
            data-cy="category-select_sortBy"
            class="navbar__select"
            @input="changeSorting"
          >
            <SfSelectOption
              v-for="(option, index) in sortBy.options"
              :key="index"
              :value="option.value"
              class="sort-by__option"
              >{{ option.attrName }}</SfSelectOption
            >
          </SfSelect>
        </LazyHydrate>
      </div>

      <div class="navbar__counter">
        <span class="navbar__label desktop-only"
          >{{ $t('Products found') }}:
        </span>
        <span class="desktop-only">{{ pagination.totalItems }}</span>
        <span class="navbar__label smartphone-only"
          >{{ pagination.totalItems }} {{ $t('Items') }}</span
        >
      </div>

      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
        <SfIcon
          data-cy="category-icon_grid-view"
          class="navbar__view-icon"
          :color="isCategoryGridView ? 'green' : 'dark-secondary'"
          icon="tiles"
          size="14px"
          role="button"
          aria-label="Change to grid view"
          :aria-pressed="isCategoryGridView"
          @click="changeToCategoryGridView"
        />
        <SfIcon
          data-cy="category-icon_list-view"
          class="navbar__view-icon"
          :color="!isCategoryGridView ? 'green' : 'dark-secondary'"
          icon="list"
          size="14px"
          role="button"
          aria-label="Change to list view"
          :aria-pressed="!isCategoryGridView"
          @click="changeToCategoryListView"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, useRoute } from '@nuxtjs/composition-api';
import { facetGetters } from '@vue-storefront/odoo';
import { defineComponent } from '@vue/composition-api';
import { useUiState, useUiHelpers } from '~/composables';
import { SfButton, SfIcon, SfSelect, SfHeading } from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  props: {
    facetsList: {
      type: Object,
      default: () => []
    }
  },
  components: {
    SfButton,
    SfHeading,
    SfIcon,
    SfSelect,
    LazyHydrate
  },
  setup(props) {
    const { query } = useRoute().value;
    const {
      isCategoryGridView,
      changeToCategoryListView,
      changeToCategoryGridView,
      toggleFilterSidebar
    } = useUiState();

    const { changeSorting } = useUiHelpers();

    const sortBy = computed(() =>
      facetGetters.getSortOptions({ input: { sort: query?.sort } } || '')
    );

    const pagination = computed(() =>
      facetGetters.getPagination(props.facetsList)
    );

    return {
      toggleFilterSidebar,
      pagination,
      changeToCategoryGridView,
      changeToCategoryListView,
      isCategoryGridView,
      sortBy,
      changeSorting
    };
  }
});
</script>
<style scoped lang="scss">
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
</style>
