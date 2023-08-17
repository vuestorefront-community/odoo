import { gql } from '@apollo/client';
import { wishlistItemsFragment } from '../fragments/';
export default gql`
    mutation($wishId: Int!){
        wishlistRemoveItem(wishId: $wishId) {
            ${wishlistItemsFragment}
        }
    }  
`;
