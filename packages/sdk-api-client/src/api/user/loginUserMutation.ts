import { gql } from '@apollo/client';
import partnerFragment from '../../api/fragments/partnerFragment';
export default gql`
mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    partner{
      id
      name
      street
      street2
      city
      state
      {
        id
      }
      country
      {
        id
      }
      email
      phone
    }
  }
}
`;
