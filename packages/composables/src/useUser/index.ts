/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context, useUserFactory, UseUserFactoryParams,
} from '@vue-storefront/core';
import { User } from '../types';
import { getUserFromAgnosticUser, getAgnosticUserFromUser } from '../getters/userGetters';

const factoryParams: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context) => {
    const user = context.$odoo.config.app.$cookies.get('user');

    if (user) {
      return getUserFromAgnosticUser(user)
    }
    return null;
  },

  logOut: async (context: Context) => {
    context.$odoo.config.app.$cookies.remove('user');
    const response = await context.$odoo.api.logOutUser();

    return response
  },

  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    return {};
  },

  register: async (context: Context, user) => {
    const agonisticUser = getAgnosticUserFromUser(user)

    const response = await context.$odoo.api.signUpUser(agonisticUser);

    context.$odoo.config.app.$cookies.set('user', response.data.result);

    //@todo need api endpoint to return user info after register
    return response;
  },

  logIn: async (context: Context, params) => {
    const response = await context.$odoo.api.logInUser(params);

    if (response.data.error) {
      throw response.data.error.data.arguments
    }

    context.$odoo.config.app.$cookies.set('user', response.data.result);

    return factoryParams.load(context);
  },

  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: changePassword');
    return {};
  }
};

export default useUserFactory<User, any, any>(factoryParams);
