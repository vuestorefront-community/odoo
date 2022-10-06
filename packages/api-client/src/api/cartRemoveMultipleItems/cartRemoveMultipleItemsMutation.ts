import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
  mutation($lineIds: [Int]!){
    cartRemoveMultipleItems(lineIds: $lineIds){
      ${orderFragment}
    }
  }`;
