import gql from 'graphql-tag';
import orderFragment from '@vue-storefront/odoo-api/src/fragments/orderFragment';

export default gql`
  mutation($lineIds: [Int]!){
    cartRemoveMultipleItems(lineIds: $lineIds){
      ${orderFragment}
    }
  }`;
