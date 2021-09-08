import gql from 'graphql-tag';

export default gql`
  query {
    deliveryMethods {
      id
      name
      price
    }
  }
`;
