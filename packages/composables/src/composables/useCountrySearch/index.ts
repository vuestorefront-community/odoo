/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, ssrRef } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { GraphQlGetCountryParams } from '@vue-storefront/odoo-api';

const useCountrySearch = (newKey: string): any => {
  const key = 'country' || newKey;
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const countries = ssrRef([], key);
  const countryStates = ssrRef([], key);

  const resetCountryErrors = () => (errors.value = { graphQLErrors: [] });

  const search = async () => {
    const { data } = await context.$odoo.api.getCountries();

    countries.value = data.countries.countries;
  };

  const searchCountryStates = async (countryId) => {
    if (!countryId) return;

    const params: GraphQlGetCountryParams = {
      id: parseInt(countryId)
    };

    const { data } = await context.$odoo.api.getCountryStates(params);

    countryStates.value = data?.country?.states || [];
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
