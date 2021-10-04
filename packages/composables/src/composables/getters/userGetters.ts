/* eslint-disable camelcase */
/* istanbul ignore file */

import { UserGetters } from '@vue-storefront/core';
import { Partner, AgnosticUser } from '@vue-storefront/odoo-api';

export const getUserFirstName = (user: Partner): string => user?.name || '';

export const getUserLastName = (user: Partner): string => user?.name || '';

export const getUserFullName = (user: Partner): string => user?.name || '';

export const getUserEmailAddress = (user: Partner): string => user?.email || '';

export const getAgnosticUserFromUser = (user: Partner): AgnosticUser => ({
  password: user.password,
  email: user.email,
  name: user.name,
  is_admin: false,
  uid: 0,
  username: user.name
});

const userGetters: UserGetters<Partner> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress,
  getAgnosticUserFromUser: getAgnosticUserFromUser
};

export default userGetters;
