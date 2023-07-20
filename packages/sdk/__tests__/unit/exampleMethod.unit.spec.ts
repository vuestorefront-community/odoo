import { exampleMethod } from '../../src/methods/exampleMethod';
import { client } from '../../src/client';

/** SETUP */
const API_METHOD_NAME = 'exampleEndpoint';
const PARAMS_MOCK = { id: 1 };
const RESPONSE_MOCK = { data: "Hello, Vue Storefront Integrator!" };
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
    await exampleMethod(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with the right params', async () => {
    await exampleMethod(PARAMS_MOCK);

    expect(client.post).toBeCalledWith(API_METHOD_NAME, PARAMS_MOCK);
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await exampleMethod(PARAMS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });

});
