import { gql } from '@apollo/client';
export default gql`
    query FullProduct($id: Int, $slug: String, $barcode: String) {
        product(id: $id, slug: $slug, barcode: $barcode) {
            id
        }
    }`;
