/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';
import { GraphQlSendResetPasswordParams } from '@vue-storefront/odoo-api';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    const params : GraphQlSendResetPasswordParams = {
      email: email
    };

    const { data } = await context.$odoo.api.sendResetPassword(params);

    return data;
  },

  setNewPassword: async (
    context: Context,
    { tokenValue, newPassword, customQuery }
  ) => {
    await context.$odoo.api.changePassword(
      {
        token: tokenValue,
        newPassword
      },
      customQuery
    );
    return {};
  }
};

export default useForgotPasswordFactory<any>(factoryParams);
