/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useCountrySearch = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const countries = ref([]);
  const countryStates = ref([]);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const search = async () => {
    // countries.value = await context.$odoo.api.getCountries().catch((error) => {
    //   errors.value = error;
    // });
    countries.value = [
      { id: 1, code: 1, name: 'Brazil' },
      { id: 2, code: 1, name: 'Portugal' }
    ];
  };

  const searchCountryStates = async (countryId) => {
    if (!countryId) return;

    countryStates.value = [
      { id: 1, code: 1, name: 'Rio de Janeiro' },
      { id: 2, code: 1, name: 'Lisboa' },
      { id: 3, code: 1, name: 'São Paulo' }
    ];

    // countryStates.value = await context.$odoo.api
    //   .getCountryStates({ countryId })
    //   .catch((error) => {
    //     errors.value = error;
    //   });
  };

  return {
    search,
    resetCountryErrors,
    searchCountryStates,
    countries,
    countryStates,
    errors
  };
};

export default useCountrySearch;
