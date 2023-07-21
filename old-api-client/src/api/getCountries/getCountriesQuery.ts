import gql from 'graphql-tag';

export default gql`
  query {
    countries(pageSize:250) {
      countries {
        id
        name
        code
      }
    }
  }
`;
