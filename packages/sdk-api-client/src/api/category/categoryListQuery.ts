import { gql } from '@apollo/client';
import { productFragment } from '../fragments/';
export default gql`
query CategoryList(
    $search: String
    $filter: CategoryFilterInput
    $currentPage: Int
    $pageSize: Int
    $sort: CategorySortInput
  ) {
    categories(
      search: $search
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sort
    ) {
      categories {
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
  }`;
