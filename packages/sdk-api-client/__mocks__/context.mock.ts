import { CustomQuery } from '@vue-storefront/middleware';
import buildClient from '../src/setup/clientSetup';
import customQueryFullProductTemplate from '../__mocks__/customQueries/customQueryFullProductTemplate';
import customQueryFullProductTemplateListWithoutPrice from '../__mocks__/customQueries/customQueryFullProductTemplateListWithoutPrice';
import customQueryCategoryWithoutChild from '../__mocks__/customQueries/customQueryCategoryWithoutChild';


const apolloClient = buildClient({
  odooGraphqlUrl: "http://localhost:3000/api/graphql",
  fetchOptions: {}
})

const customQueries = {
  customQueryFullProductTemplate,
  customQueryFullProductTemplateListWithoutPrice,
  customQueryCategoryWithoutChild
}

export const contextMock = {
  config: {} as any,
  client: apolloClient,
  api: jest.fn() as any,
  extendQuery: (customQuery: any, defaults: any) => {
    const key = Object.keys(defaults)[0]
    
    return {
      [key]: {
        query: customQuery ? customQueries[customQuery[key]] : defaults[key].query,
        variables: defaults[key].variables,
      }
    }
  },
  customQueries
};
