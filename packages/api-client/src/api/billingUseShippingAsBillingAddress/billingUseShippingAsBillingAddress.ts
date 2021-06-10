import gql from 'graphql-tag';

export default gql`
  mutation UseShippingAsBillingAddress{
    useShippingAsBillingAddress{
      ok
    }
  }`;
