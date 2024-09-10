import { client } from '../../src/client';

/** SETUP */
const API_METHOD_NAME = 'getProductTemplateList';
const PARAMS_MOCK = { };
const RESPONSE_MOCK = {  };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK)
  }
}));

/** TESTS */
describe('[Integration Boilerplate SDK][unit] exampleMethod', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('makes a single call to API Middleware', async () => {
  });

  it('makes a call to API Middleware with the right params', async () => {
  });

  it('throws an exception in case of network error', async () => {

  });

});
