import { gql } from '@apollo/client';
export default gql`
    query CustomQueryCategoryListWithoutChild{
        categories{
            categories{
                id
                name
                slug
                childs{
                id
                name
                }
            }
        }
    }`;
