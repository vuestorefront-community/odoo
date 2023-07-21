import gql from 'graphql-tag';
export default gql`
  query {
    mailingLists {
        mailingLists {
            id
            name
        }
    }
  }
`;
