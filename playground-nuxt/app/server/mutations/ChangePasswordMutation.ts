import { gql } from '@apollo/client/core';
export default gql`
mutation($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      id
      name
      email
    }
  }
`;
