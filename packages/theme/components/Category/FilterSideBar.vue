<template>
  <SfSidebar
    :visible="isFilterSidebarOpen"
    title="Filters"
    class="sidebar-filters"
    @close="toggleFilterSidebar"
  >
    <div class="filters desktop-only">
      <SfRange :value="[20, 600]" :disabled="false" :config="config" />
      <div v-for="(facet, i) in facets" :key="i">
        <template v-if="facetHasMoreThanOneOption(facet)">
          <SfHeading
            :level="4"
            :title="facet.label"
            class="filters__title sf-heading--left"
            :key="`filter-title-${facet.value}`"
          />
          <div
            v-if="isFacetColor(facet)"
            class="filters__colors"
            :key="`${facet.value}-colors`"
          >
            <SfColor
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :data-cy="`category-filter_color_${option.value}`"
              :color="option.value"
              :selected="isFilterSelected(facet, option)"
              class="filters__color"
              @click="() => selectFilter(facet, option)"
            />
          </div>
          <div v-else>
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :data-cy="`category-filter_${facet.id}_${option.value}`"
              :label="
                option.label + `${option.count ? ` (${option.count})` : ''}`
              "
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </div>
        </template>
      </div>
    </div>
    <SfAccordion class="filters smartphone-only">
      <div v-for="(facet, i) in facets" :key="i">
        <SfAccordionItem
          :key="`filter-title-${facet.id}`"
          :header="facet.label"
          class="filters__accordion-item"
        >
          <SfFilter
            v-for="option in facet.options"
            :key="`${facet.id}-${option.id}`"
            :label="option.label"
            :selected="isFilterSelected(facet, option)"
            class="filters__item"
            @change="() => selectFilter(facet, option)"
          />
        </SfAccordionItem>
      </div>
    </SfAccordion>

    <template #content-bottom>
      <div class="filters__buttons">
        <SfButton class="sf-button--full-width" @click="applyFilters">{{
          $t('Done')
        }}</SfButton>
        <SfButton
          class="sf-button--full-width filters__button-clear"
          @click="clearFilters"
          >{{ $t('Clear all') }}</SfButton
        >
      </div>
    </template>
  </SfSidebar>
</template>
<script >
import {
  SfSidebar,
  SfHeading,
  SfFilter,
  SfSelect,
  SfCheckbox,
  SfLoader,
  SfColor,
  SfButton,
  SfProperty,
  SfImage,
  SfRange,
  SfAccordion
} from '@storefront-ui/vue';
import { facetGetters } from '@vue-storefront/odoo';
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  computed
} from '@nuxtjs/composition-api';
import { useUiState, useUiHelpers } from '~/composables';

export default defineComponent({
  components: {
    SfSidebar,
    SfHeading,
    SfFilter,
    SfSelect,
    SfCheckbox,
    SfButton,
    SfLoader,
    SfColor,
    SfProperty,
    SfAccordion,
    SfImage,
    SfRange
  },
  props: {
    facetsList: {
      type: Object,
      default: () => []
    }
  },
  setup(props) {
    const selectedFilters = ref([]);
    const config = reactive({
      start: [40, 200],
      range: { min: 20, max: 600 },
      step: 1,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',
      behaviour: 'tap-drag',
      tooltips: true,
      keyboardSupport: true
    });

    const { changeFilters, isFacetColor, facetsFromUrlToFilter } =
      useUiHelpers();
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = [];
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    const isFilterSelected = (facet, option) => {
      return selectedFilters.value.some(
        (filter) => String(filter.id) === String(option.value)
      );
    };

    const facetHasMoreThanOneOption = (facet) =>
      facet?.options?.length > 1 || false;

    const selectFilter = (facet, option) => {
      const alreadySelectedIndex = selectedFilters.value.findIndex(
        (filter) => String(filter.id) === String(option.value)
      );

      if (alreadySelectedIndex === -1) {
        selectedFilters.value.push({
          filterName: facet.label,
          label: option.label,
          id: option.value
        });

        return;
      }

      selectedFilters.value.splice(alreadySelectedIndex, 1);
    };

    const facets = computed(() =>
      facetGetters.getGrouped(props.facetsList, ['color', 'size'])
    );

    onMounted(() => {
      selectedFilters.value = facetsFromUrlToFilter();
    });

    return {
      facetHasMoreThanOneOption,
      isFilterSidebarOpen,
      facets,
      config,
      toggleFilterSidebar,
      isFacetColor,
      selectFilter,
      isFilterSelected,
      clearFilters,
      applyFilters
    };
  }
});
</script>
<style scoped lang="scss">
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}

.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
