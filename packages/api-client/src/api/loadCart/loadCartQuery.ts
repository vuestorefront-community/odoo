import gql from 'graphql-tag';

export default gql`
  query ($id: ID) {
    allSaleOrders(id: $id){
      name
      amountTotal
      orderLine {
        id
        product {
          id, 
          name,
          image
          listPrice 
          attributes {
            id, name
          }
        }
        productUomQty
        priceTotal
      }
    }
  }
`;

