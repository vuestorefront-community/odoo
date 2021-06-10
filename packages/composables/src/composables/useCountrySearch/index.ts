import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useCountrySearch = () => {
    const context: Context = useVSFContext();

    const errors = ref({ graphQLErrors: [] })

    const countries = ref([])
    const countryStates = ref([])

    const resetCountryErrors = () => errors.value = { graphQLErrors: [] }

    const search = async () => {
        countries.value = await context.$odoo.api.getCountries()
            .catch(error => {
                errors.value = error
            });
    }

    const searchCountryStates = async (id) => {
        if (!id) return

        countryStates.value = await context.$odoo.api.getCountryStates({ id })
            .catch(error => {
                errors.value = error
            });
    }

    return { search, resetCountryErrors, searchCountryStates, countries, countryStates, errors }
}

export default useCountrySearch;
