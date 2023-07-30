import { initSDK, buildModule } from '@vue-storefront/sdk';
import { OdooModule, OdooModuleType } from '../../../src';

const sdkConfig = {
  odooModule: buildModule<OdooModuleType>(OdooModule, {
    apiUrl: 'http://localhost:8181/boilerplate',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
