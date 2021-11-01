<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
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
        v-slot="{ errors }"
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
      <SfButton class="form__button" :disabled="invalid">
        {{ isNew ? 'Add the address' : 'Update the address' }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script type="module">
import { SfInput, SfButton, SfSelect, SfCheckbox } from '@storefront-ui/vue';
import { useCountrySearch } from '@vue-storefront/odoo';
import { required, min, digits } from 'vee-validate/dist/rules';
import { watch } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, onBeforeMount, defineComponent } from '@vue/composition-api';
extend('required', { ...required, message: 'This field is required' });
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', { ...digits, message: 'Please provide a valid phone number' });

export default defineComponent({
  name: 'AddressForm',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    address: {
      type: Object,
      default: () => ({
        state: { id: null },
        country: { id: null }
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const {
      search,
      searchCountryStates,
      countries,
      countryStates
    } = useCountrySearch('my-account-shipping');

    const form = reactive({
      name: props.address.name,
      street: props.address.street,
      city: props.address.city,
      state: { id: String(props.address.state.id) },
      country: { id: String(props.address.country.id) },
      zip: props.address.zip,
      phone: props.address.phone,
      ...(props.isNew ? {} : { id: props.address.id })
    });

    const submitForm = () => {
      emit('submit', {
        form: form,
        onComplete: () => {},
        onError: () => {}
      });
    };
    onBeforeMount(async () => {
      await search();
      if (form?.country?.id && form.country.id !== 'null') {
        await searchCountryStates(form.country.id);
      }
    });

    watch(
      () => form.country.id,
      async () => {
        await searchCountryStates(form.country.id);
        if (!countryStates.value || countryStates.value.length === 0) {
          form.state.id = null;
        }
      }
    );
    return {
      form,
      submitForm,
      countries,
      countryStates
    };
  }
});
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
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
