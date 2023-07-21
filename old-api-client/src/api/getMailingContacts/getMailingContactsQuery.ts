import gql from 'graphql-tag';
export default gql`
  query {
    mailingContacts {
      mailingContacts {
        id
        email
        companyName
        subscriptionList {
          id
          mailingList {
            id
            name
          }
          optOut
        }
      }
    }
  }

`;
