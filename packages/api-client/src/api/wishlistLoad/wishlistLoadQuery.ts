import gql from 'graphql-tag';

export default gql`
  query {
    wishlistItems {
      wishlistItems {
        product {
          id
          name
          description
          image
          price
        }
      }
    }
  }
`;
