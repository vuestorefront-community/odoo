import gql from 'graphql-tag';

export default gql`
  query($id: [Int]) {
    countries(filter: { id: $id }) {
      countries {
        states {
          id
          name
        }
      }
    }
  }
`;
