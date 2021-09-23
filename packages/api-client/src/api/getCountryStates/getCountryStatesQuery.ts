import gql from 'graphql-tag';

export default gql`
  query($id: Int) {
    country(id: $id) {
      states {
        id
        name
      }
    }
  }
`;
