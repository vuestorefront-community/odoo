import gql from 'graphql-tag';

export default gql`
  mutation($email: String!) {
    resetPassword(email: $email) {
      id
      name
      email
    }
  }
`;
