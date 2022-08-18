import gql from 'graphql-tag';
export default gql`
  mutation($currentPassword: String!, $newPassword: String!){
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      id
    }
  }
`;
