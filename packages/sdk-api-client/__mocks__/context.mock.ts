import buildClient from '../src/setup/clientSetup';
import customQueryFullProductTemplate from '../__mocks__/customQueries/customQueryFullProductTemplate';
import customQueryFullProductTemplateListWithoutPrice from '../__mocks__/customQueries/customQueryFullProductTemplateListWithoutPrice';
import customQueryCategoryWithoutChild from '../__mocks__/customQueries/customQueryCategoryWithoutChild';
import customQueryCategoryListWithoutChild from '../__mocks__/customQueries/customQueryCategoryListWithoutChild';
import customQueryProductVariant from '../__mocks__/customQueries/customQueryProductVariant';
import customQueryCountryListWithoutState from './customQueries/customQueryCountryListWithoutState';

const apolloClient = buildClient({
  odooGraphqlUrl: 'http://localhost:5000/api/graphql',
  fetchOptions: {}
});

// Add custom queries like a real application will do
const customQueries = {
  customQueryFullProductTemplate,
  customQueryFullProductTemplateListWithoutPrice,
  customQueryCategoryWithoutChild,
  customQueryCategoryListWithoutChild,
  customQueryProductVariant,
  customQueryCountryListWithoutState
};

export const contextMock = {
  config: {} as any,
  client: apolloClient,
  api: jest.fn() as any,
  extendQuery: (customQuery: any, defaults: any) => {
    const key = Object.keys(defaults)[0];

    return {
      [key]: {
        query: customQuery ? customQueries[customQuery[key]] : defaults[key].query,
        variables: defaults[key].variables
      }
    };
  },
  customQueries
};
