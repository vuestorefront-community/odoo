import { Integration } from '@vue-storefront/middleware';
import queries from './queries'

const odooIntegration: Integration = {
  location: '@erpgap/odoo-sdk-api-client/server',
  configuration: {
    odooGraphqlUrl: 'https://vsfdemo15.labs.odoogap.com/graphql/vsf',
    queries
  }
};

export default {
  integrations: {
    odoo: odooIntegration
  }
};
