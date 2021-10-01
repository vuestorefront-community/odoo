/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const usePassword = (): any => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const resetPasswordErrors = () => (errors.value = { graphQLErrors: [] });

  const sendResetPassword = async ({ user }) => {
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

  return { resetPassword, sendResetPassword, resetPasswordErrors, errors };
};

export default usePassword;
