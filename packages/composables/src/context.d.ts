import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, Config, OdooApiMethods } from '@vue-storefront/odoo-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $odoo: IntegrationContext<ClientInstance, Config, ApiClientMethods<OdooApiMethods>>;
  }
}
