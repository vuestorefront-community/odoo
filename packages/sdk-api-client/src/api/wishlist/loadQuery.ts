import { gql } from '@apollo/client';
import { wishlistItemsFragment } from '../fragments/';
export default gql`
  query {
    wishlistItems {
      ${wishlistItemsFragment}
    }
  }
`;
