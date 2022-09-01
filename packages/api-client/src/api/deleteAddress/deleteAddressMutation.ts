import gql from 'graphql-tag';

export default gql`
  mutation($id: Int!) {
    deleteAddress(address: { id: $id }){
      result
    }
  }
`;
