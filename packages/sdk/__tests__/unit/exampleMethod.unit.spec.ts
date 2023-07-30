import { getProductTemplateList } from '../../src/methods/';
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
    await getProductTemplateList(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with the right params', async () => {
    await getProductTemplateList(PARAMS_MOCK);

    //expect(client.post).toBeCalledWith(API_METHOD_NAME, PARAMS_MOCK);
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await getProductTemplateList(PARAMS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });

});
