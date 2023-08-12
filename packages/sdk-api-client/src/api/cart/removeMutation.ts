import { gql } from '@apollo/client';
import { orderFragment } from '../fragments/';
export default gql`
    mutation($lineId: Int!){
        cartRemoveItem(lineId: $lineId){
            ${orderFragment}
        }
    }
`;
