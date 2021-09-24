import gql from 'graphql-tag';
export default gql`
  query {
    paymentAcquirers {
      id
      name
      paymentIcons {
        id
        name
        image
      }
    }
  }
`;
