<template>
  <div>
    adyenPaymentProvider
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup() {

    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
