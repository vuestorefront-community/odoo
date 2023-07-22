import { IntegrationContext, ExtendQuery } from '@vue-storefront/middleware';
import { MiddlewareConfig, ContextualizedEndpoints } from '../index';
import { ApolloClient } from '@apollo/client';

/**
 * Runtime integration context, which includes API client instance, settings, and endpoints that will be passed via middleware server.
 **/
export type OdooIntegrationContext = IntegrationContext<
  ApolloClient<any>,
  MiddlewareConfig,
  ContextualizedEndpoints
>;

/**
 * Global context of the application which includes runtime integration context.
 **/
export interface Context {
  $odoo: OdooIntegrationContext;
}
