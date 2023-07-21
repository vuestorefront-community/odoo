import gql from 'graphql-tag';

export default gql`
query($slug: String, $id: Int) {
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
      parent {
        id
        name
        slug
        parent {
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
    }
}
`;
