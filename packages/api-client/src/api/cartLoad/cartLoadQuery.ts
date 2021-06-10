import gql from 'graphql-tag';

export default gql`
  query {
    partnerShoppingCart{
      name
      amountTotal
      shippingMethod{
        id
      }
      orderLine {
        id
        product {
          id, 
          name,
          image
          listPrice 
        }
        productUomQty
        priceTotal
      },
      partnerInvoiceId{
        id, name, street, city,phone,zip, country{id},state{id}
      },
      partnerShippingId{
        id, name, street, city,phone,zip, country{id},state{id}
      }
    }
  }
`;

