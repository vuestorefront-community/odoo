<template>
  <div>
    adyenExternalPaymentProvider
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { useAdyenExternalPaymentProvider } from '@vue-storefront/odoo';

export default {
  name: 'AdyenExternalPaymentProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup(props, { emit }) {
    const { getPaymentExternalUrl } = useAdyenExternalPaymentProvider();
    console.log(getPaymentExternalUrl());
    const selectedMethod = ref(null);

    const selectMethod = (method) => {
      selectedMethod.value = method;
      emit('status');
    };

    return {
      selectedMethod,
      selectMethod
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
