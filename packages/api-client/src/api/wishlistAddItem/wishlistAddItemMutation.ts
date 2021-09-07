import gql from 'graphql-tag';

export default gql`
  mutation SignUpUser($name: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
      wishlistItems {
        id
        product {
          id
        }
      }
    }
  }
`;
