import gql from 'graphql-tag';

export default gql`
  query {
      allWishlistItems {
        id
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

