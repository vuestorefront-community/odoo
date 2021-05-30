/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const usePassword = () => {
  const context: Context = useVSFContext();

  const errors = ref({ graphQLErrors: [] })

  const resetPasswordErrors = () => errors.value = { graphQLErrors: [] }

  const sendResetPassword = async ({ user }) => {
    await context.$odoo.api.sendResetPassword(user)
      .catch(error => {
        errors.value = error
      });
  }

  const resetPassword = async ({ password, token }) => {
    await context.$odoo.api.resetPassword({ password, token })
      .catch(error => {
        errors.value = error
      });
  }

  return { resetPassword, sendResetPassword, resetPasswordErrors, errors }
}

export default usePassword;

