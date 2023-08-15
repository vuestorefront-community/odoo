import { gql } from '@apollo/client';
import { productFragment } from '../fragments/';
export default gql`
query MailingContacts {
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
