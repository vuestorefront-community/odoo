import { gql } from '@apollo/client/core';
export default gql`
mutation($email: String!) {
    resetPassword(email: $email) {
      id
      name
      email
    }
  }
`;
