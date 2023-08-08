import { gql } from '@apollo/client';
import { orderFragment } from '../fragments/';
export default gql`
    mutation($productId: Int!, $quantity: Int!) {
        cartAddItem(productId: $productId, quantity: $quantity) {
            ${orderFragment}
        }
    }
`;
