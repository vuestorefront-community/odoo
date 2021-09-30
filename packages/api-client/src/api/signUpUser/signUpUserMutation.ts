import gql from 'graphql-tag';
import partnerFragment from '../../fragments/partnerFragment';

export default gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      ${partnerFragment}
    }
  }
`;
