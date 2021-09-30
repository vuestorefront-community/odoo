import gql from 'graphql-tag';
import wishlistItemsFragment from '../../fragments/wishlistItemsFragment';

export default gql`
  mutation($wishId: Int!){
    wishlistRemoveItem(wishId: $wishId) {
      ${wishlistItemsFragment}
    }
  }
`;
