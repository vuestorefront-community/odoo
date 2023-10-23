import { createApiClient, MiddlewareConfig } from '@erpgap/odoo-sdk-api-client/server';
import { Queries } from '~/server/queries';
import { Mutations } from '~/server/mutations';

export default defineEventHandler((event) => {

  const config : MiddlewareConfig = {
    // https://odoo-cla.ce.promptequation.com/graphql/vsf
    odooGraphqlUrl: `${process.env.ODOO_BASE_URL}graphql/vsf`,
    queries: { ...Queries, ...Mutations },
    headers: {
      'REAL-IP': getRequestIP(event) || '',
      Cookie: `session_id=${parseCookies(event).session_id}`,
      'resquest-host': getRequestHost(event)
    }
  };

  event.context.apolloClient = createApiClient(config);
});

