import gql from 'graphql-tag';
export default gql`
  mutation($acquirerId: Int!){
    adyenPaymentMethods(acquirerId: $acquirerId){
      adyenPaymentMethods
    }
  }
`;
