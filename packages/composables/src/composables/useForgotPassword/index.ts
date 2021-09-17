/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    const { data } = await context.$odoo.api.sendResetPassword(
      email,
      customQuery
    );

    return data;
  },

  setNewPassword: async (
    context: Context,
    { tokenValue, newPassword, customQuery }
  ) => {
    const response = await context.$odoo.api.changePassword({
      tokenValue,
      newPassword,
      customQuery
    });
    return {};
  }
};

export default useForgotPasswordFactory<any>(factoryParams);
