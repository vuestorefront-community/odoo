import gql from 'graphql-tag';

export default gql`
  query {
    cart {
      order {
        name
        amountTotal
        amountTax
        orderLines {
          id
          product {
            id
            name
            image
          }
          quantity
          priceTotal
        }
        partnerInvoice {
          id
          name
          street
          city
          phone
          zip
          country {
            id
          }
          state {
            id
          }
        }
        partnerShipping {
          id
          name
          street
          city
          phone
          zip
          country {
            id
          }
          state {
            id
          }
        }
      }
    }
  }
`;
