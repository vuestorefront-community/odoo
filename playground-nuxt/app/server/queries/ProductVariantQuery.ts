import { gql } from '@apollo/client/core';
export default gql`
    query ProductVariant($productTemplateId: Int, $combinationId: [Int]) {
        productVariant( productTemplateId: $productTemplateId combinationId: $combinationId) {
            product {
                id
                image
                variantPrice
                variantPriceAfterDiscount
                variantHasDiscountedPrice
                alternativeProducts{
                    id
                    typeId
                    visibility
                    status
                    name
                    displayName
                    sku
                    barcode
                    description
                  }
            }
            productTemplateId
            displayName
            price
            listPrice
            hasDiscountedPrice
        }
    }`;
