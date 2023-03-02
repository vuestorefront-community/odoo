import gql from 'graphql-tag';
export default gql`
  mutation($promo: String!){
    applyCoupon(promo: $promo){
      error
    }
  }`;
