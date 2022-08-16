import gql from 'graphql-tag';
export default gql`
mutation ($mailings: [MailingInput]!) {
  userAddMultipleMailing(mailings: $mailings) {
    id
    name
    email
    companyName
    subscriptionList {
      id
      optOut
    }
  }
}

`;
