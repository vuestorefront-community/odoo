import { initSDK, buildModule } from '@vue-storefront/sdk';
import {
  boilerplateModule,
  BoilerplateModuleType,
} from '../../packages/sdk/src';

const sdkConfig = {
  odoo: buildModule<BoilerplateModuleType>(boilerplateModule, {
    apiUrl: 'http://localhost:8181/odoo',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);;
