import { gql } from '@apollo/client';
import { productFragment } from '../fragments/';
export default gql`
    query Product($id: Int, $slug: String, $barcode: String) {
        product(id: $id, slug: $slug, barcode: $barcode) {
            ${productFragment}
        }
    }`;
