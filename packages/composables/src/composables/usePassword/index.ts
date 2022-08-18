/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const usePassword = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({});
  const loading = ref(false);

  const resetPasswordErrors = () => (errors.value = { graphQLErrors: [] });

  const sendResetPassword = async (user) => {
    const response = await context.$odoo.api
      .sendResetPassword(user)
      .catch((error) => {
        errors.value = error;
      });

    return response;
  };

  const resetPassword = async ({ password, token }) => {
    const response = await context.$odoo.api
      .changePassword({ newPassword: password, token })
      .catch((error) => {
        errors.value = error;
      });

    return response;
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    resetPasswordErrors();

    loading.value = true;
    try {
      const response = await context.$odoo.api.updatePassword(currentPassword, newPassword);
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

  return { resetPassword, sendResetPassword, resetPasswordErrors, errors, updatePassword };
};

export default usePassword;
