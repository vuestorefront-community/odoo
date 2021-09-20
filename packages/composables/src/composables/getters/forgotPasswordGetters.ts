/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ForgotPasswordGetters } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResetPasswordToken(result: any): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPasswordChanged(result: any): boolean {
  return false;
}

export const forgotPasswordGetters: ForgotPasswordGetters<any> = {
  getResetPasswordToken,
  isPasswordChanged
};

export default forgotPasswordGetters;
