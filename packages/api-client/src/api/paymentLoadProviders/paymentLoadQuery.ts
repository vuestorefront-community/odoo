import gql from 'graphql-tag';
export default gql`
  query {
    paymentAcquirers {
      id
      name
      provider
      paymentIcons {
        id
        name
        image
      }
    }
  }
`;
