import gql from 'graphql-tag';
export default gql`
  query($productTemplateId: Int, $combinationId: [Int]) {
    productVariant(
      productTemplateId: $productTemplateId
      combinationId: $combinationId
    ) {
      product {
        name
        id
        variantPrice
        variantPriceAfterDiscount
        variantHasDiscountedPrice
        currency {
          id
          name
          symbol
        }
      }
      productTemplateId
      displayName
      price
      listPrice
      hasDiscountedPrice
    }
  }
`;
