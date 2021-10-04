/* eslint-disable camelcase */
import {
  getUserFirstName,
  getUserEmailAddress,
  getUserFullName,
  getUserLastName,
  getAgnosticUserFromUser
} from '../../../../src/composables/getters/userGetters';
import { mockedUser } from '../__mocks__/mockedUser';

it('get first name', () => {
  expect(getUserFirstName(mockedUser)).toStrictEqual('C3po');
});
it('get last name', () => {
  expect(getUserLastName(mockedUser)).toStrictEqual('C3po');
});
it('get full name', () => {
  expect(getUserFullName(mockedUser)).toStrictEqual('C3po');
});
it('get email', () => {
  expect(getUserEmailAddress(mockedUser)).toStrictEqual('john@gmail.com');
});

it('get agnostic user from user', () => {
  expect(getAgnosticUserFromUser(mockedUser)).toStrictEqual({
    email: 'john@gmail.com', is_admin: false, name: 'C3po', password: '123', uid: 0, username: 'C3po'
  });
});
