import gql from 'graphql-tag';
export default gql`
mutation updateAddress($id: Int!, $name: String!, $city: String!, $countryId: Int!, $phone: String!, $stateId: Int!, $street: String!, $zip: String!) {
  updateAddress(address: {id: $id, name: $name, city: $city, countryId: $countryId, phone: $phone, stateId: $stateId, street: $street, zip: $zip}) {
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
