import { DocumentNode } from '@apollo/client';

/**
 * Settings to be provided in the `middleware.config.js` file.
 */
export interface MiddlewareConfig {
  odooGraphqlUrl: string;
  proxy?: string;
  fetchOptions?: any;
  fetch?: any;
  headers?: Record<string, string>
  queries?: Record<string, DocumentNode>

}
