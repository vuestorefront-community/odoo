/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import onCreate from './setup/clientSetup';
import cookieExtension from './extensions/cookieExtension';

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: [cookieExtension]
});

export { createApiClient };
