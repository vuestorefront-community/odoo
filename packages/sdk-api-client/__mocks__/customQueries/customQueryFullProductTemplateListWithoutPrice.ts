import { gql } from '@apollo/client';
export default gql`
    query CustomQueryProductTemplateWithoutPrice {
        products{
            products{
              id
              name
            }
          }
    }`;
