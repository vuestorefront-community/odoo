import { gql } from '@apollo/client';
export default gql`
    query customQueryProductTemplateWithoutPrice {
        products{
            products{
              id
              name
            }
          }
    }`;
