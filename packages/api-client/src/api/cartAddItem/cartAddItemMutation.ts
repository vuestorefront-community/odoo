import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
  mutation($productId: Int!, $quantity: Int!) {
    cartAddItem(productId: $productId, quantity: $quantity) {
      ${orderFragment}
    }
  }
`;
