import gql from 'graphql-tag';
import partnerFragment from '../../fragments/partnerFragment';
export default gql`
  query {
    ${partnerFragment}
  }
`;
