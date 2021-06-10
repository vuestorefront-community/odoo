import gql from 'graphql-tag';

export default gql`
  mutation($username: String!){
    sendResetPassword(email: $username) {
      ok
    }
  }
`;

