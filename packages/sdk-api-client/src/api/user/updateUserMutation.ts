import gql from 'graphql-tag';

export default gql`
mutation($id: Int!, $name: String, $email: String){
    updateMyAccount(myaccount:{id:$id, name: $name, email: $email}){
      id
      name
      street
      street2
      city
      state
      {
        id
      }
      country
      {
        id
      }
      email
      phone
      } 
  }
`; 
