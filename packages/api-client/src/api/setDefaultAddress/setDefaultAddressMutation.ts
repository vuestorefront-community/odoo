import gql from 'graphql-tag';
export default gql`
mutation($id: Int!, $type: AddressEnum!){
  selectAddress(address:{ id: $id }, type: $type){
    id
    name
    street
    street2
    city
    state
    {
      id
    }
    country
    {
      id
    }
    email
    phone
  }
}`;
