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
      attributes {
        id
        name
        displayType
        values {
          id
          name
          htmlColor
          search
          attributeId
        }
      }
      products {
        id
        firstVariant
        smallImage
        price
        name
        description
        image
        slug
        sku
        isInWishlist
        status
        categories {
          id
          name
          slug
        }
        attributeValues {
          id
        }
      }
    }
  }
`;
