<template>
  <div id="product">
    <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" :imageWidth="422" :imageHeight="644" class="product__gallery"
          :nuxtImgConfig="{ fit: 'cover' }" :thumb-nuxt-img-config="{ fit: 'cover' }" image-tag="nuxt-img"
          thumb-image-tag="nuxt-img" />
      </LazyHydrate>
      <div class="product__info">
        <div class="product__header">
          <SfHeading :title="productGetters.getName(product)" :level="3"
            class="sf-heading--no-underline sf-heading--left" />
          <SfIcon icon="drag" size="xxl" color="var(--c-text-disabled)" class="product__drag-icon smartphone-only" />
        </div>
        <div class="product__price-and-rating">
          <SfPrice :regular="$n(productGetters.getPrice(product).regular, 'currency')" :special="
            productGetters.getPrice(product).special &&
            $n(productGetters.getPrice(product).special, 'currency')
          " />
          <div>
            <div class="product__rating">
              <SfRating :score="averageRating" :max="5" />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton data-cy="product-btn_read-all" class="sf-button--text">{{
                $t('Read all reviews')
            }}</SfButton>
          </div>
        </div>
        <div>
          <p class="product__description desktop-only">
            {{ description }}
          </p>
          <SfButton data-cy="product-btn_size-guide" class="sf-button--text desktop-only product__guide">
            {{ $t('Size guide') }}
          </SfButton>

          <div v-if="options.select">
            <SfSelect v-for="(select, selectKey) in options.select" :key="selectKey" class="sf-select--underlined"
              :value="$route.query[select.label]" :label="select.label" required
              @input="(selected) => updateFilter({ [select.label]: selected })">
              <SfSelectOption :key="`${selectKey}_${itemKey}`" :value="item.value" :label="item.label"
                v-for="(item, itemKey) in select.values">
              </SfSelectOption>
            </SfSelect>
          </div>

          <div v-if="options.radio">
            <template v-for="(radio, radioKey) in options.radio">
              <p class="product__radio-label" :key="radioKey">
                {{ radio.label }}:
              </p>
              <SfRadio class="sf-radio--transparent" v-for="(item, itemKey) in radio.values" required
                :key="`${radioKey}_${itemKey}`" :selected="$route.query[radio.label]" :name="radio.label"
                :value="item.value" :label="item.label" @change="updateFilter({ [radio.label]: item.value })" />
            </template>
          </div>

          <div v-if="options.color" class="product__colors desktop-only">
            <template v-for="(option, colorKey) in options.color">
              <p class="product__color-label" :key="colorKey">
                {{ $t('Color') }}:
              </p>

              <SfColor required v-for="(color, itemKey) in option.values" :key="`${colorKey}_${itemKey}`"
                :color="color.label" class="product__color" :selected="checkSelected(option.label, color.value)"
                @click="updateFilter({ [option.label]: color.value })">
              </SfColor>
            </template>
          </div>
          <SfAddToCart data-cy="product-cart_add" :stock="stock" v-model="qty"
            :disabled="loading || !allOptionsSelected" :canAddToCart="stock > 0" class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty) })" />
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab data-cy="product-tab_description" title="Description">
              <div class="product__description">
                {{ $t('Product description') }}
              </div>

              <SfProperty name="Product Code" value="Product Code" class="product__property">
                <template #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ code }}
                  </SfButton>
                </template>
              </SfProperty>

              <SfProperty v-for="(property, i) in properties" :key="i" :name="property.attributeName"
                :value="property.value" class="product__property">
                <template v-if="property.name === 'Category'" #value>
                  <SfButton class="product__property__button sf-button--text">
                    {{ property.value }}
                  </SfButton>
                </template>
              </SfProperty>
            </SfTab>
            <SfTab title="Read reviews" data-cy="product-tab_reviews">
              <SfReview v-for="review in reviews" :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)" :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)" :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)" :char-limit="250" read-more-text="Read more"
                hide-full-text="Read less" class="product__review" />
            </SfTab>
            <SfTab title="Additional Information" data-cy="product-tab_additional" class="product__additional-info">
              <div class="product__additional-info">
                <p class="product__additional-info__title">
                  {{ $t('Brand') }}
                </p>
                <p>{{ brand }}</p>
                <p class="product__additional-info__title">
                  {{ $t('Instruction1') }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t('Instruction2') }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t('Instruction3') }}
                </p>
                <p>{{ careInstructions }}</p>
              </div>
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts :products="relatedProducts" :loading="relatedLoading" title="Match it with" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfRadio,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfColorPicker,
  SfLoader
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, reactive } from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  useProductVariant,
  reviewGetters,
  facetGetters
} from '@vue-storefront/odoo';

import { onSSR } from '@vue-storefront/core';

import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
export default {
  name: 'Product',
  transition: 'fade',
  setup (props, { root }) {
    const qty = ref(1);
    const { id } = root.$route.params;
    const { query } = root.$route;
    const { size, color } = root.$route.query;
    const configuration = reactive({ size, color });
    const {
      products,
      search,
      loading: productloading
    } = useProduct(`products-${id}`);
    const { searchRealProduct, productVariants, realProduct, elementNames } =
      useProductVariant(query);
    const { products: relatedProducts, loading: relatedLoading } =
      useProduct('relatedProducts');
    const { addItem, loading } = useCart();
    const { addTags } = useCache();

    const { reviews: productReviews } = useReview('productReviews');

    const product = computed(() => {
      return {
        ...products.value,
        realProduct: realProduct.value
      };
    });

    const options = computed(() =>
      productGetters.getAttributes(product.value, ['color', 'size'])
    );
    const description = computed(() =>
      productGetters.getDescription(product.value)
    );
    const properties = computed(() =>
      productGetters.getProperties(product.value)
    );
    const code = computed(() => productGetters.getCode(product.value));

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbsByProduct(product.value)
    );

    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );

    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: root.$image(img.small, 128, 128, product.value.imageFilename) },
        desktop: { url: root.$image(img.normal, 422, 644, product.value.imageFilename) },
        big: { url: root.$image(img.big, 422, 644, product.value.imageFilename) },
        alt: product.value.name || 'alt'
      }))
    );

    onSSR(async () => {
      await searchRealProduct({
        productTemplateId: parseInt(id),
        combinationIds: Object.values(root.$route.query)
      });
      await search({ id: parseInt(id) });
      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
    });

    const updateFilter = (filter) => {
      root.$router.push({
        path: root.$route.path,
        query: { ...root.$route.query, ...filter }
      });
    };

    const allOptionsSelected = computed(() => {
      let keys = [];
      Object.keys(options.value).forEach((item) => {
        keys = [
          ...options.value[item].map((element) => element.label),
          ...keys
        ];
      });
      const queryParams = Object.keys(root.$route.query);

      return keys.every((param) => queryParams.includes(param));
    });

    const checkSelected = (attribute, value) => {
      return root.$route.query[attribute] === value;
    };

    return {
      productloading,
      breadcrumbs,
      allOptionsSelected,
      checkSelected,
      elementNames,
      updateFilter,
      configuration,
      product,
      code,
      description,
      properties,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productGetters,
      productVariants,
      productGallery
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfRadio,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    SfLoader,
    RelatedProducts,
    MobileStoreBanner,
    SfColorPicker,
    LazyHydrate
  },
  data () {
    return {
      stock: 5,
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!'
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;

    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;

    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;

    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(--count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary));
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(--product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary));
  }

  &__select-size {
    margin: 0 var(--spacer-sm);

    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(--product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary));
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__radio-label {
    @include font(--product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary));
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;

    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);

    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(--additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary));

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
  text-transform: capitalize;
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, 30%, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
