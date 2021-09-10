<template>
  <div>
   <s-address-shopping />
  </div>
</template>

<script>
import SAddressShopping from '../../pages/Checkout/Shipping.vue'
import { useUiHelpers, useUiState, useUserShipping } from '~/composables';
import { onSSR } from '@vue-storefront/core';
export default {
  name: 'Shipping-address-form',
  components: {
    SAddressShopping
  },
  steup(props, { root }) {
    const tese = useUserShipping();
    console.log(tese)
  }
}
</script>
