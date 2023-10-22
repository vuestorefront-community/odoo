import { createApiClient } from '../../../../packages/sdk-api-client/src/index.server';
import { MiddlewareConfig } from '../../../../packages/sdk-api-client/src/index';
import { Queries } from '~/server/queries';
import { Mutations } from '~/server/mutations';

export default defineEventHandler((event) => {

  if(event.method == 'POST') {
    const config : MiddlewareConfig = {
      odooGraphqlUrl: `${process.env.ODOO_BASE_URL}graphql/vsf`,
      queries: { ...Queries, ...Mutations },
      headers: {
          Cookie: `session_id=${parseCookies(event).session_id}`,  
          'resquest-host': getRequestHost(event),
          'REAL-IP': getRequestIP(event) || ''
      }
    };
    
    event.context.apolloClient = createApiClient(config);
  }

  
});

