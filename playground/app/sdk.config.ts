import { initSDK, buildModule } from '@vue-storefront/sdk';
import {
  OdooModule,
  OdooModuleType
} from '../../packages/sdk/src';

const sdkConfig = {
  odoo: buildModule<OdooModuleType>(OdooModule, {
    apiUrl: 'http://localhost:8181/odoo'
  })
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
