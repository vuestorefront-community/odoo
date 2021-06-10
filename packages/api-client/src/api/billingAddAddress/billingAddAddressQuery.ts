import gql from 'graphql-tag';

export default gql`
mutation AddBillingAddress(
    $city: String!,
    $countryId: Int!,
    $firstName: String!,
    $houseNumber: String!,
    $lastName: String!,
    $phone: String!,
    $stateId: Int!,
    $street: String!,
    $zipCode: String!
  ) {
    addBillingAddress(
    city: $city,
    countryId: $countryId,
    firstName: $firstName,
    houseNumber: $houseNumber,
    lastName: $lastName,
    phone: $phone,
    stateId: $stateId,
    street: $street,
    zipCode: $zipCode
    ) {
      ok
    }
  }
`;
