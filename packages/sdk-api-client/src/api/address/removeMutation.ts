import { gql } from '@apollo/client';
export default gql`
mutation deleteAddress ($id: Int!) {
    deleteAddress(address: { id: $id }){
      result
    }
  }
`;
