import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';
export default gql`
  query {
    ${productFragment}
  }
`;
