import gql from 'graphql-tag';

export default gql`
    query{
        allDeliveryMethods{
            id, name
        }
    }
`;
