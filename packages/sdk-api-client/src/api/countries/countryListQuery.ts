import { gql } from '@apollo/client';
export default gql`
query CountryList($filter: CountryFilterInput, $currentPage: Int, $pageSize: Int, $search: String, $sort: CountrySortInput) {
  countries(filter: $filter, currentPage: $currentPage, pageSize: $pageSize, search: $search, sort: $sort) {
    countries{
      code
      id
      imageUrl
      name
      states{
      id
      name
      code
      }
    }
  }
}
`;

