import gql from 'graphql-tag';

export default gql`
  mutation($productId: Int!, $quantity: Int!) {
    cartAddItem(productId: $productId, quantity: $quantity) {
      order {
        id
      }
    }
  }
`;
