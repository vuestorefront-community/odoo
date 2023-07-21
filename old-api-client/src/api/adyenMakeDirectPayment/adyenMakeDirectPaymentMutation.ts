import gql from 'graphql-tag';
export default gql`
  mutation ($acquirerId: Int!, $reference: String!, $token: String!, $browserInfo: GenericScalar!, $paymentMethod: GenericScalar!) {
    adyenPayments(acquirerId: $acquirerId, transactionReference: $reference, accessToken: $token, browserInfo: $browserInfo, paymentMethod: $paymentMethod) {
      adyenPayments
    }
  }
`;
