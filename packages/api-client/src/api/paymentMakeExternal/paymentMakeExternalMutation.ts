import gql from 'graphql-tag';
export default gql`
  mutation($paymentAcquireId: Int!){
    makePayment(paymentAcquireId:$paymentAcquireId){
      form
    }
  } 
`;
