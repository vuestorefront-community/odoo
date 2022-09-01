import gql from 'graphql-tag';
export default gql`
  mutation($acquirerId: Int!){
    adyenAcquirerInfo(acquirerId: $acquirerId){
      adyenAcquirerInfo
    }
  }
`;
