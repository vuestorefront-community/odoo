import gql from 'graphql-tag';

export default gql`
  query {
  orders {
    orders {
      id
      name
      dateOrder
      stage
      amountUntaxed
      amountTax
      amountTotal
      amountDelivery
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
      orderLines {
        id
        name
        product {
          id
          name
          image
          image
          displayName
        }
      }
    }
  }
}

`;
