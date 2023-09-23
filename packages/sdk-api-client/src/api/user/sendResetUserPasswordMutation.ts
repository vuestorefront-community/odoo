import { gql } from '@apollo/client';
export default gql`
mutation($email: String!) {
    resetPassword(email: $email) {
      id
      name
      email
    }
  }
`;
