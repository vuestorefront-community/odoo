import gql from 'graphql-tag';

export default gql`
  query {
    addresses(filter: { addressType: Shipping }) {
      id
      name
      city
      street
      street2
      city
      state {
        id
        name
        code
      }
      zip
      email
      country {
        id
        name
        code
      }
      phone
      contacts {
        name
        phone
      }
    }
  }
`;
