import gql from 'graphql-tag';

export default gql`
    query ($term: String, $topCategory: Boolean){
      allEcommerceCategories(name: $term, topCategory: $topCategory) {
        id
        name
      }
    }
`;

