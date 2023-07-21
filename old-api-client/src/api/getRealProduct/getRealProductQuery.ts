import gql from 'graphql-tag';
export default gql`
  query($productTemplateId: Int, $combinationId: [Int]) {
    productVariant(
      productTemplateId: $productTemplateId
      combinationId: $combinationId
    ) {
      product {
        id
        image
        variantPrice
        variantPriceAfterDiscount
        variantHasDiscountedPrice
      }
      productTemplateId
      displayName
      price
      listPrice
      hasDiscountedPrice
    }
  }
`;
