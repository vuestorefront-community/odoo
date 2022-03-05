<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <CategoryNavbar :facetsList="result" />

    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader :class="{ loading }" :loading="loading">
          <SfAccordion
            :multiple="true"
            :open="currentCategoryNameForAccordion"
            showChevron
            transition="sf-expand"
          >
            <SfAccordionItem
              v-for="(cat, i) in categoryTree.items"
              :key="i"
              :header="cat.label"
            >
              <template>
                <SfList class="list">
                  <SfListItem
                    class="list__item"
                    v-for="(subCat, j) in cat.items"
                    :key="j"
                  >
                    <SfMenuItem
                      :count="subCat.count || ''"
                      :data-cy="`category-link_subcategory_${subCat.slug}`"
                      :label="subCat.label"
                    >
                      <template #label="{ label }">
                        <nuxt-link
                          :to="localePath(th.getCatLink(subCat))"
                          :class="
                            subCat.isCurrent ? 'sidebar--cat-selected' : ''
                          "
                        >
                          {{ label }}
                        </nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                </SfList>
              </template>
            </SfAccordionItem>
            <SfAccordionItem header="Extra">
              <SfList>
                <SfListItem>
                  <SfCheckbox
                    label="Generic"
                    v-model="generic"
                    name="generic"
                  />
                </SfListItem>
              </SfList>
            </SfAccordionItem>
          </SfAccordion>
        </SfLoader>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="showProducts">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              data-cy="category-product-card"
              v-for="(product, i) in products"
              :key="product.id"
              :style="{ '--index': i }"
              :imageWidth="216"
              :imageHeight="288"
              :title="productGetters.getName(product)"
              :image="$image(productGetters.getCoverImage(product))"
              :nuxtImgConfig="{ fit: 'cover' }"
              image-tag="nuxt-img"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              :isAddedToCart="isInCart({ product })"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
              class="products__product-card"
              @click:wishlist="
                isInWishlist({ product })
                  ? removeItemFromWishList({ product: { product } })
                  : addItemToWishlist({ product })
              "
              @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              :key="product.id"
              :style="{ '--index': i }"
              :imageWidth="140"
              :imageHeight="200"
              :nuxtImgConfig="{ fit: 'cover', alt: '123' }"
              image-tag="nuxt-img"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="$image(productGetters.getCoverImage(product))"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              :max-rating="5"
              :score-rating="3"
              :isInWishlist="isInWishlist({ product })"
              class="products__product-card-horizontal"
              @click:wishlist="addItemToWishlist({ product })"
              @click:add-to-cart="
                addItemToCart({ product, quantity: product.qty })
              "
              v-model="products[i].qty"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product
                  )}`
                )
              "
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block"
                  @click="() => {}"
                >
                  {{ $t('Save for later') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              data-cy="category-pagination"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{
              $t('Show on page')
            }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination.itemsPerPage.toString()"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :width="256"
            :height="176"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t('Sorry, we didnt find what youre looking for') }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </SfButton>
        </div>
      </SfLoader>
    </div>

    <LazyHydrate when-idle>
      <CategoryFilterSideBar :facetsList="result" />
    </LazyHydrate>
  </div>
</template>

<script>
import {
  SfButton,
  SfList,
  SfMenuItem,
  SfProductCard,
  SfHeading,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfCheckbox,
  SfSelect,
  SfProperty,
  SfBreadcrumbs,
  SfLoader,
  SfImage
} from '@storefront-ui/vue';
import { ref, computed, onMounted } from '@nuxtjs/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  facetGetters
} from '@vue-storefront/odoo';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Category',
  transition: 'fade',
  setup(props, { root }) {
    const th = useUiHelpers();
    const generic = ref('');

    const { addTags } = useCache();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist
    } = useWishlist();
    const { result, search, loading } = useFacet();
    const { params } = root.$router.history.current;

    const products = computed(() => facetGetters.getProducts(result.value));
    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );

    const pagination = computed(() => facetGetters.getPagination(result.value));
    const showProducts = computed(
      () => !loading.value && products.value?.length > 0
    );

    const currentCategory = computed(() => {
      const categories = result.value?.data?.categories || [];
      return categories[0] || {};
    });

    const currentCategoryNameForAccordion = computed(() => {
      const name =
        currentCategory.value?.parent?.name ||
        categoryTree.value?.items[0]?.label ||
        '';
      return name;
    });

    const currentRootCategory = computed(() => {
      const categories = result.value?.data?.categories || [];
      const category = categories.find((category) => {
        return category.slug === params.slug_1;
      });

      const categoryFromParent = currentCategory.value?.parent?.parent;

      return category || categoryFromParent || {};
    });

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs({
        input: {
          params,
          currentRootCategory: currentRootCategory.value
        }
      })
    );

    onSSR(async () => {
      const params = {
        ...th.getFacetsFromURL()
      };

      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2
        }
      ]);
    });

    onMounted(() => {
      root.$scrollTo(root.$el, 2000);
    });

    return {
      ...uiState,
      currentRootCategory,
      currentCategory,
      th,
      generic,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      breadcrumbs,
      addItemToWishlist,
      removeItemFromWishList,
      addItemToCart,
      isInWishlist,
      isInCart,
      showProducts,
      result,
      currentCategoryNameForAccordion
    };
  },
  components: {
    SfSelect,
    SfProperty,
    SfButton,
    SfList,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfHeading,
    SfAccordion,
    SfBreadcrumbs,
    SfCheckbox,
    SfLoader,
    LazyHydrate,
    SfImage
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
  text-transform: capitalize;
}

.sort-by {
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: space-between;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-lg) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
