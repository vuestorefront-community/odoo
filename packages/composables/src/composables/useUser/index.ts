/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { Context, useUserFactory, UseUserFactoryParams} from '@vue-storefront/core';
import { Partner, GraphQlUpdateAccountParams, GraphQlLoginParams, AgnosticUser } from '@vue-storefront/odoo-api';

const throwErrors = (errors) => {
  if (errors) {
    throw new Error(errors.map(error => error.message).join(',') || 'Some error');
  }
};

const factoryParams: UseUserFactoryParams<Partner, GraphQlUpdateAccountParams, any> = {
  load: async (context: Context) => {
    const user = context.$odoo.config.app.$cookies.get('odoo-user');
    if (user) {
      const { data, errors } = await context.$odoo.api.loadUser();
      return data.partner;
    }
    return null;
  },

  logOut: async (context: Context) => {
    context.$odoo.config.app.$cookies.remove('odoo-user');
    await context.$odoo.api.logOutUser();
  },

  updateUser: async (context: Context, { currentUser, updatedUserData, customQuery }) => {

    const params: GraphQlUpdateAccountParams = {
      id: currentUser.id,
      name: updatedUserData.name,
      email: updatedUserData.email
    };
    const { data, errors } = await context.$odoo.api.updateAccount(params, customQuery);

    throwErrors(errors);

    return data.updateMyAccount;
  },

  register: async (context: Context, params?: Partner & { customQuery }) => {
    const { customQuery } = params;

    const { data, errors } = await context.$odoo.api.signUpUser(params, customQuery);

    throwErrors(errors);

    context.$odoo.config.app.$cookies.set('odoo-user', data.register);

    return data.register;

  },
  logIn: async (context: Context, params: AgnosticUser & { customQuery }) => {
    const { customQuery } = params;

    const loginParams : GraphQlLoginParams = {
      email: params.username,
      password: params.password
    };

    const { data, errors } = await context.$odoo.api.logInUser(loginParams, customQuery);

    throwErrors(errors);

    context.$odoo.config.app.$cookies.set('odoo-user', data.login.partner);
    return data.login.partner;

  },

  changePassword: async (
    context: Context,
    { currentUser, currentPassword, newPassword }
  ) => {
    console.log('Mocked: changePassword');
    return {} as Partner;
  }
};

export default useUserFactory<Partner, any, any>(factoryParams);
