import { sdk } from './__config__/sdk.config';

describe('[Integration Boilerplate SDK][integration] exampleMethod', () => {
  it('makes a request to the middleware', async () => {
    const EXPECTED_RESPONSE = {"data": "Hello, Vue Storefront Integrator!"};

    const res = await sdk.boilerplate.exampleMethod({
      id: 1,
    });

    expect(res).toEqual(EXPECTED_RESPONSE);
  });
});
