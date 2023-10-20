import { createApiClient } from '@erpgap/odoo-sdk-api-client/server';
import { Queries } from '~/server/queries';
import { Mutations } from '~/server/mutations';

export default defineEventHandler((event) => {

  event.context.apolloClient = createApiClient({
    odooGraphqlUrl: `${process.env.ODOO_BASE_URL}graphql/vsf`,
    queries: { ...Queries, ...Mutations }
  });
});

