/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { Context, useUserFactory, UseUserFactoryParams} from '@vue-storefront/core';
import { Partner, GraphQlUpdateAccountParams, GraphQlLoginParams } from '@vue-storefront/odoo-api';
import { getAgnosticUserFromUser} from '../getters/userGetters';
const factoryParams: UseUserFactoryParams<Partner, GraphQlUpdateAccountParams, any> = {
  load: async (context: Context) => {
    const { data, errors } = await context.$odoo.api.loadUser();

    return data.partner;
  },

  logOut: async (context: Context) => {
    context.$odoo.config.app.$cookies.remove('odoo-user');
    const response = await context.$odoo.api.logOutUser();
  },

  updateUser: async (context: Context, { currentUser, updatedUserData }) => {

    const params: GraphQlUpdateAccountParams = {
      id: currentUser.id,
      name: updatedUserData.name,
      email: updatedUserData.email
    };
    const { data } = await context.$odoo.api.updateAccount(params);

    return data.updateMyAccount;
  },

  register: async (context: Context, user) => {
    const { data, errors } = await context.$odoo.api.signUpUser(user);

    if (errors) {
      throw new Error(errors.map((e) => e.message).join(','));
    }

    context.$odoo.config.app.$cookies.set('odoo-user', data.register);
    return data.register;
  },

  logIn: async (context: Context, params) => {
    const loginParams : GraphQlLoginParams = {
      email: params.username,
      password: params.password
    };

    const { data, errors } = await context.$odoo.api.logInUser(loginParams);

    if (errors) {
      throw new Error(errors.map((e) => e.message).join(','));
    }

    context.$odoo.config.app.$cookies.set('odoo-user', data.login);
    return data.login;
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
