import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
 mutation($lineId: Int!){
  cartRemoveItem(lineId: $lineId){
    ${orderFragment}
  }
}
`;
