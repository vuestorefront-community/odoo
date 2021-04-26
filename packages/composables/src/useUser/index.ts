/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
import { User as AgnosticUser } from '@vue-storefront/odoo-api/src/types';

// @todo useUser

const params: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context) => {
    console.log('Mocked: loadUser');
    return null;
  },

  logOut: async (context: Context) => {
    const response = await context.$odoo.api.logOutUser();
  },

  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    return {};
  },

  register: async (context: Context, user) => {
    const agonisticUser: AgnosticUser = {
      password: user.password,
      email: user.email,
      name: user.firstName
    };
    const response = await context.$odoo.api.signUpUser(agonisticUser);
    return response;
  },

  logIn: async (context: Context, params) => {
    const response = await context.$odoo.api.logInUser(params);

    return {};
  },

  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: changePassword');
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
