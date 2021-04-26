import gql from 'graphql-tag';

export default gql`
    query($id: ID, $limit: Int = 20, $offset: Int = 0) {
    allProducts(id: $id, limit: $limit, offset: $offset) {
        id, name, slug, description, defaultCode, image, listPrice
        }
    }
`;
