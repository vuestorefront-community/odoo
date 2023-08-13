import { gql } from '@apollo/client';
export default gql`
  query MailingLists {
    mailingLists {
        mailingLists {
            id
            name
        }
    }
  }
`;