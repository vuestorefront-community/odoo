import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useShipping = () => {

    const context: Context = useVSFContext();

    const errors = ref({ graphQLErrors: [] })

    const shippingAddress = ref({})
    const shippingMethods = ref([])

    const resetCountryErrors = () => errors.value = { graphQLErrors: [] }

    const searchShippingMethods = async () => {
        if (shippingMethods.value.length > 0) {
            return shippingMethods
        }

        shippingMethods.value = await context.$odoo.api.shippingGetDeliveryMethods({}, {});
    }

    const load = async () => {
        if (shippingAddress?.value?.hasOwnProperty('firstName')) {
            return shippingAddress
        }

        const cart = await context.$odoo.api.cartLoad({}, {});
        if (!cart) {
            return
        }

        shippingAddress.value = {
            streetName: cart.partnerShippingId.street,
            apartment: '',
            postalCode: cart.partnerShippingId.zip,
            phone: cart.partnerShippingId.phone,
            firstName: cart.partnerShippingId.name,
            city: cart.partnerShippingId.city,
            country: cart.partnerShippingId.country?.id,
            state: cart.partnerShippingId.state?.id,
            selectedMethodShipping: cart.shippingMethod?.id
        }

        return shippingAddress
    }

    return { resetCountryErrors, load, searchShippingMethods, shippingAddress, shippingMethods, errors }
}

export default useShipping;
