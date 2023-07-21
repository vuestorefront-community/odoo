import gql from 'graphql-tag';
import wishlistItemsFragment from '../../fragments/wishlistItemsFragment';

export default gql`
  query {
    wishlistItems {
      ${wishlistItemsFragment}
    }
  }
`;
