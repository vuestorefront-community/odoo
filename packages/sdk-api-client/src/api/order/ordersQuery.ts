import { gql } from '@apollo/client';
export default gql`
query Orders{
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
        priceUnit
        quantity
        product {
          id
          name
          image
          image
          slug
          displayName
        }
      }
    }
  }
}
`;
