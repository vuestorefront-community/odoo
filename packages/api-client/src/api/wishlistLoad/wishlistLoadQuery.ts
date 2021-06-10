import gql from 'graphql-tag';

export default gql`
  query {
      allWishlistItems {
        id
        active
        price
        currency {
          id
          name
        }
        product {
          id
          name
          description
          image
          listPrice
        }
      }
    }
`;

