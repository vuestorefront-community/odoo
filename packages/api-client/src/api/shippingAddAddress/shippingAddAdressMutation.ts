import gql from 'graphql-tag';

export default gql`
mutation addAddress($name: String!, $city: String!, $countryId: Int!, $phone: String!, $stateId: Int!, $street: String!, $zip: String!) {
  addAddress(type: Shipping, address: {name: $name, city: $city, countryId: $countryId, phone: $phone, stateId: $stateId, street: $street, zip: $zip}) {
    id
    name
  }
}`;
