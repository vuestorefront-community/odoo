import { gql } from '@apollo/client';
export default gql`
query CustomQueryCategoryWithoutChild($slug: String, $id: Int) {
    category(slug: $slug, id: $id) {
        id
        name
        slug
      }
  }`;
