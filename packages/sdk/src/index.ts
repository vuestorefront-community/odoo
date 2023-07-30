import { odooConnector } from './connector';
import type { Options } from './types';
import type { Module } from '@vue-storefront/sdk';

/**
 * Boulerplate module type.
 */
export interface OdooModuleType extends Module {
  /**
   * The connector of the Odoo module.
   */
  connector: ReturnType<typeof odooConnector>;
}

/**
 * Odoo module.
 */
export const OdooModule = (options: Options): OdooModuleType => ({
  connector: odooConnector({
    apiUrl: options.apiUrl,
  }),
  utils: {},
  subscribers: {},
});

export { client } from './client';

export * from './types';
