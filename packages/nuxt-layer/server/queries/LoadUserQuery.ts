import { gql } from '@apollo/client/core';
import {partnerFragment} from './fragments';
export default gql`
  query LoadUser {
    ${partnerFragment}
  }
`;
