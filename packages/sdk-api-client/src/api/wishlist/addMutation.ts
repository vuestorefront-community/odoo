import { gql } from '@apollo/client';
import { wishlistItemsFragment } from '../fragments/';
export default gql`
    mutation($productId: Int!) {
        wishlistAddItem(productId: $productId) {
            ${wishlistItemsFragment} 
        }
    }
`;
