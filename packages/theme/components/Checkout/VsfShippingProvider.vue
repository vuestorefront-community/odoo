<template>
  <div>
    <SfRadio
      v-for="method in shippingMethods"
      :key="method.id"
      :label="method.name"
      :value="method.id"
      :description="method.name"
      :selected="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @change="selectMethod(method.id)"
    >
      <div class="shipping__label">
        {{ method.name }}
      </div>

      <div class="shipping__description">
        {{ method.name }}
      </div>
    </SfRadio>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, onMounted, watch } from '@nuxtjs/composition-api';
import { useShippingMethods } from '@vue-storefront/odoo';

export default {
  name: 'VsfShippingProvider',
  props: {
    selectedMethodShipping: {
      type: [String, Number],
      default: ''
    }
  },
  components: {
    SfButton,
    SfRadio
  },
  setup(props, context) {
    const selectedMethod = ref(null);
    const { searchShippingMethods, shippingMethods } = useShippingMethods();
    const selectMethod = (method) => {
      selectedMethod.value = method;
      context.emit('selectedMethod', method);
    };

    watch(
      () => props.selectedMethodShipping,
      () => {
        selectedMethod.value = props.selectedMethodShipping;
      }
    );

    onMounted(async () => {
      await searchShippingMethods();
    });

    return {
      shippingMethods,
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
