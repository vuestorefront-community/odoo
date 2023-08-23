import { gql } from '@apollo/client';

export default gql`
mutation addAddress($address: AddAddressInput!, $type: AddressEnum!) {
    addAddress(type: $type, address: $address) {
      id
      name 
      street
      street2
      city
      zip
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