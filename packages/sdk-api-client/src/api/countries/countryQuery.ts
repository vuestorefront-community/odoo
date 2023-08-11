import { gql } from '@apollo/client';
export default gql`
query Country($id: Int) {
  country (id: $id) {
    code,
    id,
    imageUrl,
    name,
    states{
      id
      name
      code
      }    
  }     
}
`;
