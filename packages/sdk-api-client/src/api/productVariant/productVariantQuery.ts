import { gql } from '@apollo/client';
export default gql`
    query ProductVariant($productTemplateId: Int, $combinationId: [Int]) {
        productVariant( productTemplateId: $productTemplateId combinationId: $combinationId) {
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
    }`;
