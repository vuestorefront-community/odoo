/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useBilling = () => {
    const context: Context = useVSFContext();

    const errors = ref({ graphQLErrors: [] })
    const billingAddress = ref({})

    const resetPasswordErrors = () => errors.value = { graphQLErrors: [] }

    const load = async () => {
        if (billingAddress?.value?.hasOwnProperty('firstName')) {
            return billingAddress
        }

        const cart = await context.$odoo.api.cartLoad({}, {});
        if (!cart) {
            return
        }

        billingAddress.value = {
            streetName: cart.partnerInvoiceId.street,
            apartment: '',
            postalCode: cart.partnerInvoiceId.zip,
            phone: cart.partnerInvoiceId.phone,
            firstName: cart.partnerInvoiceId.name,
            city: cart.partnerInvoiceId.city,
            country: cart.partnerInvoiceId.country?.id,
            state: cart.partnerInvoiceId.state?.id
        }

        return billingAddress
    }

    const useShippingAsBillingAddress = async () => {
        await context.$odoo.api.billingUseShippingAsBillingAddress({}, {});
    }



    return { load, errors, resetPasswordErrors, useShippingAsBillingAddress, billingAddress }
};

export default useBilling