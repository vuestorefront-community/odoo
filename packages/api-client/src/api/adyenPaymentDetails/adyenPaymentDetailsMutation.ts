import gql from 'graphql-tag';
export default gql`
  mutation($acquirerId: Int!, $reference: String!, $details: GenericScalar!){
    adyenPaymentDetails(acquirerId: $acquirerId, transactionReference: $reference, paymentDetails: $details){
      adyenPaymentDetails
    }
  }
`;
