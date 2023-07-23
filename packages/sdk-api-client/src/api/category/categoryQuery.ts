import { gql } from '@apollo/client';
import { productFragment } from '../fragments/';
export default gql`
query Category($slug: String, $id: Int) {
    category(slug: $slug, id: $id) {
        id
        name
        slug
        childs {
          id
          name
          slug
          childs {
            id
            name
            slug
          }
        }
      }
  }
`;
