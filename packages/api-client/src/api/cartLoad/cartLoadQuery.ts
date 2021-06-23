import gql from 'graphql-tag';

export default gql`
  query {
    userShoppingCart{
      name
      amountTotal
      amountTax
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
      partnerInvoice{
        id, name, street, city,phone,zip, country{id},state{id}
      },
      partnerShipping{
        id, name, street, city,phone,zip, country{id},state{id}
      }
    }
  }
`;

