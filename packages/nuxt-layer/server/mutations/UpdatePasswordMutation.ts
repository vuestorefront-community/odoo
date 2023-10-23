import { gql } from '@apollo/client/core';
export default gql`
mutation($currentPassword: String!, $newPassword: String!){
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      id
    }
  }
`;
