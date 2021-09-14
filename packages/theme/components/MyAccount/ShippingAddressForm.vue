<template>
  <div>
    <s-address-shopping v-if="!displayConfirmMessage" @finish="hasSendForm" >
      <p slot="btn-text">{{ $t('Update Profile') }}</p>
    </s-address-shopping>
    <h3 v-else>A new <span>address</span> has been added to your profile</h3>
    <p class="centralizer">
    </p>
  </div>
</template>

<script>
import SAddressShopping from '../../pages/Checkout/Shipping.vue'
import { ref } from '@vue/composition-api';
import { SfButton, SfList, SfContentPages  } from '@storefront-ui/vue';
export default {
  name: 'Shipping-address-form',
  components: {
    SAddressShopping,
    SfContentPages,
    SfList,
    SfButton,
  },
  setup() {
    const displayConfirmMessage = ref(false);
    return {
      displayConfirmMessage
    }
  },
  methods: {
    hasSendForm() {
      this.displayConfirmMessage = true
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    text-align: center;
    span {
      color: #5ece7b;
      font-weight: 500;
    }
  }
  a {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }
</style>
