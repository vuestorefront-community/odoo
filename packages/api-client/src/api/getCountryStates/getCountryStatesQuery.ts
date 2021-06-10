import gql from 'graphql-tag';

export default gql`
    query ($countryId: ID!) {
        allCountries(countryId: $countryId) {
            states {
                id
                name
            }
        }
    }
`;
