/**
 * Settings to be provided in the `middleware.config.js` file.
 */
export interface MiddlewareConfig {
  odooGraphqlUrl: string;
  fetchOptions: any;
  sessionAuth: string,
  requestHost: string,
  realIp: string
}