import { gql } from '@apollo/client';
import { partnerFragment } from '../fragments/';
export default gql`
  query {
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
`;
