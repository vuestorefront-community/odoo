import { gql } from '@apollo/client';
export default gql`
    query CustomQueryProductVariant($productTemplateId: Int, $combinationId: [Int]) {
        productVariant( productTemplateId: $productTemplateId combinationId: $combinationId) {
            product {
                id
                image
                variantPrice
                variantPriceAfterDiscount
                variantHasDiscountedPrice
            }
        }
    }`;
   