/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const usePassword = (): any => {
  const context: Context = useVSFContext();

  const errors = ref(null);
  const loading = sharedRef(false, 'usePasswordLoading');

  const resetPasswordErrors = () => (errors.value = null);

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

  const updatePassword = async (currentPassword, newPassword) => {
    resetPasswordErrors();

    loading.value = true;

    try {
      const { data, errors: apiError } = await context.$odoo.api.updatePassword({ currentPassword, newPassword });

      if (data.updatePassword) {
        return data.updatePassword;
      }

      errors.value = apiError;

    } catch (error) {
      errors.value = error;
    } finally {
      loading.value = false;
    }
  };

  return { resetPassword, sendResetPassword, resetPasswordErrors, errors, updatePassword, loading };
};

export default usePassword;
