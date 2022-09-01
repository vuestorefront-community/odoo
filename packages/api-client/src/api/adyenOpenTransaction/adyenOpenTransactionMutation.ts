import gql from 'graphql-tag';
export default gql`
  mutation($acquirerId: Int!){
    adyenTransaction(acquirerId: $acquirerId) {
      transaction
    }
  }
`;
