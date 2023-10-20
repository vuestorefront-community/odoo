import { client } from './client';
import { Options } from './types';
import * as methods from './methods/index';

/**
 * Connector methods.
 */
type Methods = typeof methods;

/**
 * Initialize the Odoo connector.
 */
export const odooConnector = (options: Options): Methods => {
  client.defaults.baseURL = options.apiUrl

  return methods;
};
