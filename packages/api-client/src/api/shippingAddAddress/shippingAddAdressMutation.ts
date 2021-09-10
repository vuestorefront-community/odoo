import gql from 'graphql-tag';

export default gql`
  mutation addAddress(
    $city: String!,
    $countryId: Int!,
    $firstName: String!,
    $lastName: String!,
    $phone: String!,
    $stateId: Int!,
    $street: String!,
    $zip: String!
  ) {
    addAddress(
    city: $city,
    countryId: $countryId,
    firstName: $firstName,
    lastName: $lastName,
    phone: $phone,
    stateId: $stateId,
    street: $street,
    zip: $zip
    ) {
      ok
    }
  }`;
