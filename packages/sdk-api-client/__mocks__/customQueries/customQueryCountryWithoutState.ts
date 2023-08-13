import { gql } from '@apollo/client';
export default gql`
query customQueryCountryWithoutState($id: Int){
  country ($id: Int) {
    code
    id
    imageUrl
    name     
  }     
}`;