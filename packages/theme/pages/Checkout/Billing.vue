<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="formRef">
    <SfHeading
      :level="3"
      :title="$t('Billing')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div class="form">
        <SfCheckbox
          :selected="sameAsShipping"
          label="Copy address data from shipping"
          name="copyShippingAddress"
          class="form__element"
          @change="handleCheckSameAddress"
        />
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.name"
            label="First name"
            name="firstName"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="streetName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.street"
            label="Street name"
            name="streetName"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.zip"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="form.country.id"
            label="Country"
            name="country"
            class="
              form__element form__element--half form__select
              sf-select--underlined
            "
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.id"
              :value="countryOption.id"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>

        <ValidationProvider
          name="state"
          rules="required"
          v-slot="{ errors, validate }"
          slim
        >
          <SfSelect
            v-model="form.state.id"
            label="State/Province"
            name="state"
            class="
              form__element form__element--half form__select
              sf-select--underlined
              form__element--half-even
            "
            required
            @change="validate"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryStateOption in countryStates"
              :key="countryStateOption.id"
              :value="countryStateOption.id"
            >
              {{ countryStateOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>

        <ValidationProvider
          name="phone"
          rules="required|digits:9"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.phone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="form__action-button"
            type="submit"
            :disabled="invalid"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, onMounted, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  useBilling,
  useCountrySearch,
  useShippingAsBillingAddress
} from '@vue-storefront/odoo';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});
export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, { root }) {
    const {
      search,
      searchCountryStates,
      countries,
      countryStates
    } = useCountrySearch();
    const { load: loadBillingAddress, billing, save, error } = useBilling();

    const { use } = useShippingAsBillingAddress();

    const isFormSubmitted = ref(false);
    const sameAsShipping = ref(false);
    const formRef = ref(false);

    const form = ref({
      name: '',
      street: '',
      city: '',
      state: { id: null },
      country: { id: null },
      zip: '',
      phone: null
    });

    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        const shippingAddress = await use();

        form.value = shippingAddress;

        await searchCountryStates(form.value.country.id);
      }
    };

    const handleFormSubmit = async () => {
      await save({ billingDetails: form.value });
      isFormSubmitted.value = true;

      if (!error.save) {
        root.$router.push('/checkout/payment');
      }
    };

    onSSR(async () => {});

    onMounted(async () => {
      await loadBillingAddress();
      await search();
      if (billing) {
        form.value = billing.value;
      }
      formRef.value.validate({ silent: true });
    });

    watch(
      () => form?.value?.country.id,
      async () => {
        await searchCountryStates(form?.value?.country?.id || null);
        if (!countryStates.value || countryStates.value.length === 0) {
          form.value.state.id = null;
        }
      }
    );

    return {
      error,
      formRef,
      countries,
      countryStates,
      handleCheckSameAddress,
      sameAsShipping,
      form,
      handleFormSubmit
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}
.form {
  &__select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
    ::v-deep .sf-select__label {
      left: initial;
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    width: 100%;
    @include for-desktop {
      width: 25rem;
    }
    &--add-address {
      width: 100%;
      margin: 0 0 var(--spacer-sm) 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    width: 100%;
    margin: var(--spacer-sm) 0 var(--spacer-xl);
    &:hover {
      color: white;
    }
  }
}
</style>
