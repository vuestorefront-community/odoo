import { gql } from '@apollo/client';
import { orderFragment } from '../fragments/';
export default gql`
    mutation($lineId: Int!, $quantity: Int!) {
        cartUpdateItem(lineId: $lineId, quantity: $quantity) {
            ${orderFragment}
        }
    }
`;
