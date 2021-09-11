<template>
  <div>
   <s-address-shopping />
  </div>
</template>

<script>
import SAddressShopping from '../../pages/Checkout/Shipping.vue'
import { ref } from '@vue/composition-api';
export default {
  name: 'Shipping-address-form',
  components: {
    SAddressShopping
  },
  setup(props, { root }) {
    // const hasSaved = ref(false);
    // hasSaved.value = root.$on('finish', e => e)
    // console.log(hasSaved)
    // return {
    //   hasSaved
    // }
  },
}
</script>
