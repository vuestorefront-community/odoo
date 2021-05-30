import gql from 'graphql-tag';

export default gql`
    query ($term: String){
      allEcommerceCategories(name: $term) {
        id
        name
        slug
      }
    }
`;

