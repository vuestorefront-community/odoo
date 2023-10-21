import { createApiClient } from '../../../../packages/sdk-api-client/src/index.server';
import { MiddlewareConfig } from '../../../../packages/sdk-api-client/src/index';
import { Queries } from '~/server/queries';
import { Mutations } from '~/server/mutations';

export default defineEventHandler((event) => {

  const config : MiddlewareConfig = {
    odooGraphqlUrl: `${process.env.ODOO_BASE_URL}graphql/vsf`,
    queries: { ...Queries, ...Mutations },
    realIp: getRequestIP(event),
    sessionAuth: parseCookies(event).session_id,
    requestHost: getRequestHost(event)
  };
  
  event.context.apolloClient = createApiClient(config);
});

