/* eslint-disable camelcase */
/* istanbul ignore file */

import { UserGetters } from '@vue-storefront/core';
import { AgnosticUser } from '@vue-storefront/odoo-api';
import { User } from '@vue-storefront/odoo-api/src/types';

export const getUserFirstName = (user: User): string => user?.name || '';

export const getUserLastName = (user: User): string => user?.name || '';

export const getUserFullName = (user: User): string => user?.name || '';

export const getUserEmailAddress = (user: User): string => user?.email || '';

export const getAgnosticUserFromUser = (user: User): AgnosticUser => ({
  password: user.password,
  email: user.email,
  name: user.name,
  is_admin: false,
  uid: 0,
  username: user.name
});

export const getUserFromAgnosticUser = (user: AgnosticUser): User => ({
  password: user.password,
  email: user.email,
  name: user.name
});

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress,
  getAgnosticUserFromUser: getAgnosticUserFromUser
};

export default userGetters;
