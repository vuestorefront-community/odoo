import { client } from './client';
import { Options } from './types';
import * as methods from './methods/index';

/**
 * Connector methods.
 */
type Methods = typeof methods;

/**
 * Initialize the Boilerplate connector.
 */
export const boilerplateConnector = (options: Options): Methods => {
  client.defaults.baseURL = options.apiUrl;

  return methods;
};
