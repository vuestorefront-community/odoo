import { gql } from '@apollo/client/core';

export default gql`
query(
  $filter: ProductFilterInput
  $currentPage: Int
  $pageSize: Int = 0
  $search: String
  $sort: ProductSortInput
) {
  products(
    filter: $filter
    currentPage: $currentPage
    pageSize: $pageSize
    search: $search
    sort: $sort
  ) {
    totalCount
    attributeValues {
      id
      name
      displayType
      name
      htmlColor
      search
      attribute{
        id
        name
      }
      
    }
    products {
      id
    }
  }
}
`;
