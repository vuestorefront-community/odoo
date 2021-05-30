<template>
  <div id="reset-password">
    <ValidationObserver v-slot="{ handleSubmit, reset }">
      <SfHeading
        title="Change Password"
        :level="3"
        class="sf-heading sf-heading--left"
      />
      <form class="form" @submit.prevent="handleSubmit(submitForm(reset))">
        <div class="form__horizontal">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            vid="password"
            class="form__element"
          >
            <SfInput
              v-model="form.newPassword"
              type="password"
              name="newPassword"
              label="New Password"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|confirmed:password"
            class="form__element"
          >
            <SfInput
              v-model="form.repeatPassword"
              type="password"
              name="repeatPassword"
              label="Repeat Password"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <li-user-error :errors="mapGraphQLErrorToArray(errors)" />
        <SfButton class="form__button">
          {{ $t('Update password') }}
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { required, confirmed } from 'vee-validate/dist/rules';
extend('required', required);
extend('confirmed', {
  ...confirmed,
  message: 'Passwords must match.',
});
import { usePassword } from '@vue-storefront/odoo';
import LiUserError from '~/components/LiUserError';

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  SfBreadcrumbs,
  SfContentPages,
  SfHeading,
  SfInput,
  SfButton,
} from '@storefront-ui/vue';

export default {
  name: 'Reset',
  components: {
    SfInput,
    SfHeading,
    SfButton,
    ValidationProvider,
    ValidationObserver,
    SfBreadcrumbs,
    SfContentPages,
    LiUserError,
  },
  setup(_, { emit, root, router }) {
    const resetForm = () => ({
      newPassword: '',
      repeatPassword: '',
    });
    const success = ref(null);

    const { resetPassword, errors } = usePassword();

    const mapGraphQLErrorToArray = (errors) =>
      errors?.graphQLErrors.map((item) => item.message);

    const form = ref(resetForm());

    const submitForm = async () => {
      errors.value = { graphQLErrors: [] };
      await resetPassword({
        password: newPassword.value,
        token: root.$route.query.token,
      });
      if (errors.value.graphQLErrors.length === 0) {
      }
    };
    return {
      mapGraphQLErrorToArray,
      form,
      submitForm,
      success,
      errors,
    };
  },
};
</script>

<style lang='scss' scoped>
#reset-password {
  padding: var(--spacer-xl) 0 var(--spacer-xl) 0;
  margin: auto;
  width: 80%;
  @include for-desktop {
    width: 60%;
  }
}
.form {
  &__element {
    display: block;
    margin: var(--spacer-lg) 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>