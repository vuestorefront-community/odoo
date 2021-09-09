import gql from 'graphql-tag';
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
      products {
        categories {
          id
          name
          slug
        }
        id
        smallImage
        name
        description
        image
        slug
        sku
        isInWishlist
        status
        attributeValues {
          id
        }
        price
      }
    }
  }
`;
