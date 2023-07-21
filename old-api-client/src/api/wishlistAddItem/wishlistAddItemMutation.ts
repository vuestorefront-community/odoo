import gql from 'graphql-tag';
import wishlistItemsFragment from '../../fragments/wishlistItemsFragment';

export default gql`
  mutation($productId: Int!) {
    wishlistAddItem(productId: $productId) {
      ${wishlistItemsFragment}
    }
  }
`;
