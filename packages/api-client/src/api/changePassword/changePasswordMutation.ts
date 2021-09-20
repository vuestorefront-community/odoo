import gql from 'graphql-tag';

export default gql`
  mutation($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      id
      name
      email
    }
  }
`;
