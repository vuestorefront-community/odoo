import gql from 'graphql-tag';

export default gql`
  mutation($password: String!, $token: String!){
    resetPassword(password: $password, token: $token) {
      ok
    }
  }
`;

