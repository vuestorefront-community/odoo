
<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="formRef">
    <SfHeading
      :level="3"
      :title="$t('Shipping Details')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        v-model="defaultShippingAddress"
        :current-address-id="currentAddressId || ''"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div class="form" v-if="canAddNewAddress">
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-model="form.firstName"
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
            v-model="form.streetName"
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
            v-model="form.postalCode"
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
            v-model="form.country"
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
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="form.state"
            label="State/Province"
            name="state"
            class="
              form__element form__element--half form__select
              sf-select--underlined
              form__element--half-even
            "
            required
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
      <SfButton
        v-if="!canAddNewAddress"
        class="color-light form__action-button form__action-button--add-address"
        type="button"
        @click.native="handleAddNewAddressBtnClick"
      >
        {{ $t('Add new address') }}
      </SfButton>

      <SfHeading
        :level="3"
        :title="$t('Select shipping method')"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <VsfShippingProvider
        :selectedMethodShipping="form.selectedMethodShipping"
        @submit="$router.push('/checkout/billing')"
        @selectedMethod="handleSelectedMethodShipping"
      />
      <SfButton
        type="submit"
        :disabled="invalid || !form.selectedMethodShipping"
      >
        {{ $t('Continue to billing') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { SfHeading, SfInput, SfButton, SfSelect } from '@storefront-ui/vue';
import { ref, watch, onMounted, computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  useCountrySearch,
  useUser,
  useUserShipping,
  userShippingGetters,
  useShipping,
} from '@vue-storefront/odoo';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number',
});
export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () =>
      import('~/components/Checkout/UserShippingAddresses.vue'),
    VsfShippingProvider: () =>
      import('~/components/Checkout/VsfShippingProvider'),
  },
  setup(props, { root }) {
    const isFormSubmitted = ref(false);
    const formRef = ref(false);
    const currentAddressId = ref('');
    const defaultShippingAddress = ref(false);
    const isShippingDetailsStepCompleted = ref(false);
    const canAddNewAddress = ref(true);

    const { loading, addAddress, shipping: userShipping } = useUserShipping();
    const { shippingAddress, load: loadShipping } = useShipping();

    const { isAuthenticated } = useUser();

    const { search, searchCountryStates, countries, countryStates } =
      useCountrySearch();

    const form = ref({
      firstName: '',
      lastName: '',
      streetName: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: '',
      selectedMethodShipping: '',
    });
    const handleFormSubmit = async () => {
      await addAddress({
        address: form.value,
      });
      isFormSubmitted.value = true;
      root.$router.push('/checkout/billing');
    };

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }

      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });
    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = '';
      form.value = {};
      canAddNewAddress.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr) => {
      form.value = addr;
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSelectedMethodShipping = (method) => {
      form.value.selectedMethodShipping = method;
    };

    onMounted(async () => {
      await search();
      await loadShipping();
      if (shippingAddress) {
        form.value = shippingAddress.value;
      }
      formRef.value.validate({ silent: true });
    });

    watch(
      () => form.value.country,
      async () => {
        await searchCountryStates(form.value.country);
      }
    );

    return {
      formRef,
      handleSelectedMethodShipping,
      isShippingDetailsStepCompleted,
      canAddNewAddress,
      handleAddNewAddressBtnClick,
      defaultShippingAddress,
      handleSetCurrentAddress,
      currentAddressId,
      userShipping,
      hasSavedShippingAddress,
      isAuthenticated,
      loading,
      isFormSubmitted,
      form,
      countries,
      countryStates,
      handleFormSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
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
    --button-width: auto;
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
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color: var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
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
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
