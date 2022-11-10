/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { GraphqlMailingInput, MailingContact, MailingItem } from '@vue-storefront/odoo-api';

const useMailing = (): any => {
  const context: Context = useVSFContext();
  const loading = ref(false);
  const mailingList = sharedRef([], 'mailingList');
  const mailingContacts = sharedRef([], 'mailingContacts');
  const errors = ref({});

  const resetErrors = () => {
    errors.value = { graphQLErrors: [] };
  };

  const getMailingLists = async () => {
    resetErrors();
    loading.value = true;

    try {
      const { data } = await context.$odoo.api.getMailingLists();

      mailingList.value = data?.mailingLists?.mailingLists;

    } catch (error) {
      errors.value = error;
    } finally {
      loading.value = false;
    }
  };

  const getMailingContacts = async () => {
    resetErrors();
    loading.value = true;

    try {
      const { data } = await context.$odoo.api.getMailingContacts();
      mailingContacts.value = data?.mailingContacts?.mailingContacts;

    } catch (error) {
      errors.value = error;
    } finally {
      loading.value = false;
    }
  };

  const userAddMultipleMailing = async (mailings: GraphqlMailingInput[]) => {
    resetErrors();
    loading.value = true;

    try {
      const response = await context.$odoo.api.addMultipleMailings({ mailings });
      const { data } = response;

      if (data) {
        return data;
      } else {
        errors.value = response.errors;
      }
    } catch (error) {
      errors.value = error;
    } finally {
      loading.value = false;
    }
  };

  return {
    getMailingContacts,
    getMailingLists,
    userAddMultipleMailing,
    errors,
    loading,
    mailingList,
    mailingContacts
  };
};

export default useMailing;
