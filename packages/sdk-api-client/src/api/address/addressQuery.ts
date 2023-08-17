import { gql } from '@apollo/client';
export default gql`
query Addresses($type: [AddressEnum]!) {
    addresses(filter: { addressType: $type }) {
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
