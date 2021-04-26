import gql from 'graphql-tag';

export default gql`
    query {
    allEcommerceCategories {
      id, name, slug
    }
  }
`;

