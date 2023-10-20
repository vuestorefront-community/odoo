import { Partner, ProductVariant } from "~/graphql";

export type ProductVariantQueryResponse = {
    productVariant: ProductVariant
}

export type LoginMutationResponse  = {
    login: {
        partner: Partner
    }
}