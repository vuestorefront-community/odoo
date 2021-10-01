/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User, GraphQlUpdateAccountParams } from '@vue-storefront/odoo-api/src/types';
import {
  getAgnosticUserFromUser
} from '../getters/userGetters';

const factoryParams: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context) => {
    const user = context.$odoo.config.app.$cookies.get('odoo-user');
    if (user) {
      const { partner, errors } = await context.$odoo.api.loadUser();
      return partner;
    }

    return null;
  },

  logOut: async (context: Context) => {
    context.$odoo.config.app.$cookies.remove('odoo-user');
    const response = await context.$odoo.api.logOutUser();

    return response;
  },

  updateUser: async (context: Context, { currentUser, updatedUserData }) => {

    const params: GraphQlUpdateAccountParams = {
      id: currentUser.id,
      name: updatedUserData.name,
      email: updatedUserData.email
    };
    const { updateMyAccount } = await context.$odoo.api.updateAccount(params);

    return updateMyAccount;
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

    context.$odoo.config.app.$cookies.set('odoo-user', login.partner);
    return login.partner;
  },

  changePassword: async (
    context: Context,
    { currentUser, currentPassword, newPassword }
  ) => {
    console.log('Mocked: changePassword');
    return {} as User;
  }
};

export default useUserFactory<User, any, any>(factoryParams);
