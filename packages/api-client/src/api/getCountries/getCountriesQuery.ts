import gql from 'graphql-tag';

export default gql`
    query{
        allCountries {
            id
            code
            name
            }
        }
`;
