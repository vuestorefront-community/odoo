import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import onSetup from './setup/clientSetup';

const { createApiClient } = apiClientFactory({
  tag: 'odoo',
  onSetup,
  api
});

export { createApiClient };

export * from './types';
