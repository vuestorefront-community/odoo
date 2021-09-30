import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
  mutation($lineId: Int!, $quantity: Int!) {
    cartUpdateItem(lineId: $lineId, quantity: $quantity) {
      ${orderFragment}
    }
  }
`;
