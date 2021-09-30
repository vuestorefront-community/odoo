import gql from 'graphql-tag';
import partnerFragment from '../../fragments/partnerFragment';
export default gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ${partnerFragment}
    }
  }
`;
