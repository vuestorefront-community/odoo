import buildClient from '../src/setup/clientSetup';
import { MiddlewareConfig } from '../src/types';

const apolloClient = buildClient({
  odooGraphqlUrl: 'http://localhost:5000/api/graphql',
  fetchOptions: {}
});

export const contextMock = {
  config: {
    queries: {

    }
  } as MiddlewareConfig,
  client: apolloClient,
  api: jest.fn() as any

};
