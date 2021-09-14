import gql from 'graphql-tag';
export default gql`
  query($productTemplateId: Int, $combinationId: [Int]) {
    productVariant(
      productTemplateId: $productTemplateId
      combinationId: $combinationId
    ) {
      productId
      productTemplateId
      displayName
      price
      listPrice
      hasDiscountedPrice
    }
  }
`;
