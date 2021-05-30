import gql from 'graphql-tag';

export default gql`
    query($id: ID, $limit: Int = 20, $offset: Int = 0, $term: String, $published: Boolean) {
    allProductsTemplate(id: $id, limit: $limit, offset: $offset, name: $term, websitePublished: $published) {
        id, name, slug, description, defaultCode, image, listPrice
        }
    }
`;
