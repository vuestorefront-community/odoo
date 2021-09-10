import gql from 'graphql-tag';

export default gql`
  query {
    countries {
      countries {
        id
        name
        code
      }
    }
  }
`;
