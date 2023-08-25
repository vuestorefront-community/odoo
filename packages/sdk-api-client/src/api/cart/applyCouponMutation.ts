import { gql } from '@apollo/client';
export default gql`
  mutation($promo: String!){
    applyCoupon(promo: $promo){
      error
    }
  }`;
