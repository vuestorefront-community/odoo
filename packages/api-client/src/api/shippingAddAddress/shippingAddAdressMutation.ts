import gql from 'graphql-tag';

export default gql`
  mutation AddShippingAddress(
    $city: String!,
    $countryId: Int!,
    $deliveryMethodId: ID!,
    $firstName: String!,
    $houseNumber: String!,
    $lastName: String!,
    $phone: String!,
    $stateId: Int!,
    $street: String!,
    $zipCode: String!
  ) {
    addShippingAddress(
    city: $city,
    countryId: $countryId,
    deliveryMethodId: $deliveryMethodId,
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
  }`;
