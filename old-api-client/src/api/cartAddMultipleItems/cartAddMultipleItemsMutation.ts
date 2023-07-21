import gql from 'graphql-tag';
import orderFragment from '../../fragments/orderFragment';

export default gql`
  mutation($products: [ProductInput]!){
    cartAddMultipleItems(products: $products){
      ${orderFragment}
    }
  }`;
