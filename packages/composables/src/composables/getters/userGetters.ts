/* eslint-disable camelcase */
/* istanbul ignore file */

import { UserGetters } from '@vue-storefront/core';
import { User } from '../types';
import { AgnosticUser } from '@vue-storefront/odoo-api/src/types';

export const getUserFirstName = (user: User): string => user?.firstName || '';

export const getUserLastName = (user: User): string => user?.lastName || '';

export const getUserFullName = (user: User): string =>
  user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: User): string => user?.email || '';

export const getAgnosticUserFromUser = (user: User): AgnosticUser => ({
  password: user.password,
  email: user.email,
  name: user.firstName,
  is_admin: false,
  uid: 0,
  username: user.firstName
});

export const getUserFromAgnosticUser = (user: AgnosticUser): User => ({
  password: user.password,
  email: user.username,
  firstName: user.name
});

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress,
  getAgnosticUserFromUser: getAgnosticUserFromUser
};

export default userGetters;
