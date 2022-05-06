import gql from 'graphql-tag';

export default gql`
mutation($shippingMethodId: Int!){
  setShippingMethod(shippingMethodId: $shippingMethodId){
    	order{
        id
        name
        shippingMethod{
          id
          name
          price
        }
      }
  }
}
`;
