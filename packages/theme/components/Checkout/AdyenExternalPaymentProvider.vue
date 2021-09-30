<template>
  <div>
    <form
      method="post"
      v-html="paymentExternalResponse"
      ref="form"
      v-show="false"
    ></form>
  </div>
</template>

<script>
/* eslint-disable camelcase */

import { onMounted, ref } from '@vue/composition-api';
import { useAdyenExternalPaymentProvider } from '@vue-storefront/odoo';

export default {
  name: 'AdyenExternalPaymentProvider',
  props: {
    provider: {
      required: true,
      type: Object
    }
  },
  setup(props, { emit }) {
    const form = ref('form');

    const {
      paymentExternalResponse,
      getPaymentExternal
    } = useAdyenExternalPaymentProvider(props.provider);

    const sendForm = () => {
      // set the url action from api
      form.value.action = form.value[0]?.dataset?.actionUrl;
      // remove input from api before send form
      form.value[0].remove();

      // form.value[9].value = '/api/checkout';
      // form.value[10].value = '{"return_url": "/checkout/payment"}';
      form.value.submit();
    };

    onMounted(async () => {
      await getPaymentExternal();
      emit('isPaymentReady', true);
      emit('providerPaymentHandler', sendForm);
    });

    return {
      paymentExternalResponse,
      sendForm,
      form
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
