import { DocumentNode } from '@apollo/client';

/**
 * Settings to be provided in the `middleware.config.js` file.
 */
export interface MiddlewareConfig {
  odooGraphqlUrl: string;
  fetchOptions?: any;
  headers?: Record<string, string>
  queries?: Record<string, DocumentNode>

}
