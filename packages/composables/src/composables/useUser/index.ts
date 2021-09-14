/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
import {
  getUserFromAgnosticUser,
  getAgnosticUserFromUser
} from '../getters/userGetters';

const factoryParams: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context) => {
    const user = context.$odoo.config.app.$cookies.get('odoo-user');

    if (user) {
      return getUserFromAgnosticUser(user);
    }
    return null;
  },

  logOut: async (context: Context) => {
    context.$odoo.config.app.$cookies.remove('odoo-user');
    const response = await context.$odoo.api.logOutUser();

    return response;
  },

  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    return {};
  },

  register: async (context: Context, user) => {
    const agonisticUser = getAgnosticUserFromUser(user);

    const { register, errors } = await context.$odoo.api.signUpUser(
      agonisticUser
    );

    if (errors) {
      throw new Error(errors.map((e) => e.message).join(','));
    }

    context.$odoo.config.app.$cookies.set('odoo-user', register.partner);
    return register.partner;
  },

  logIn: async (context: Context, params) => {
    const { login, errors } = await context.$odoo.api.logInUser(params);

    if (errors) {
      throw new Error(errors.map((e) => e.message).join(','));
    }

    return login.partner;
  },

  changePassword: async (
    context: Context,
    { currentUser, currentPassword, newPassword }
  ) => {
    console.log('Mocked: changePassword');
    return {};
  }
};

export default useUserFactory<User, any, any>(factoryParams);
