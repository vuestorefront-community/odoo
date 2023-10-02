import { gql } from '@apollo/client';

export default gql`
mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      partner{
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
  }`;  

