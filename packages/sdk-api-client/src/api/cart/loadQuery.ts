import { gql } from '@apollo/client';
import { orderFragment } from '../fragments/';
export default gql`
  query {
    cart {
      ${orderFragment}
    }
  }
`;
