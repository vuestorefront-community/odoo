<template>
  <SfModal :visible="isNewsletterModalOpen" class="modal" @close="closeModal">
    <template #modal-bar>
      <SfBar
        class="modal__title smartphone-only"
        :close="true"
        :title="$t('Subscribe to newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div>
        <SfHeading
          :level="3"
          :title="$t('Subscribe to newsletter')"
          class="modal__title desktop-only"
        />
        <ValidationObserver v-slot="{ handleSubmit, invalid }" key="log-in">
          <form @submit.prevent="$emit('email-submitted', emailAddress)">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                type="email"
                :label="$t('Email address')"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                v-model="emailAddress"
                class="modal__input"
              />
            </ValidationProvider>

            <SfButton
              class="modal__button"
              type="submit"
              :disabled="loading || invalid"
            >
              {{ $t('I confirm subscription') }}
            </SfButton>
          </form>
        </ValidationObserver>

        <SfHeading
          :description="$t('You can unsubscribe at any time')"
          :level="3"
        />
      </div>
    </transition>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfHeading,
  SfInput,
  SfButton,
  SfScrollable,
  SfBar,
  SfLink
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'NewsletterModal',
  components: {
    ValidationProvider,
    ValidationObserver,
    SfModal,
    SfHeading,
    SfInput,
    SfButton,
    SfScrollable,
    SfBar,
    SfLink
  },
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();

    const isHidden = ref(true);
    const emailAddress = ref('');

    const closeModal = () => {
      toggleNewsletterModal();
    };

    return {
      isNewsletterModalOpen,
      toggleNewsletterModal,
      isHidden,
      emailAddress,
      closeModal
    };
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --overlay-z-index: 3;
  --modal-content-padding: var(--spacer-xl);
  &__input,
  .sf-input__label {
    --input-font-size: var(--font-size--base);
    --input-label-font-size: var(--font-size--base);
  }
  &__button {
    margin: 0 auto;
  }
  &__content {
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
  }
  .sf-scrollable__view-all.sf-button {
    font-weight: var(--font-weight--light);
  }
}
</style>
