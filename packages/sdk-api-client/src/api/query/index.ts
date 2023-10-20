import { Endpoints, OdooIntegrationContext, QueryMetadataParams } from '../../types';
import consola from 'consola';

export const query: Endpoints['query'] = async <ApiParams, ApiResponseType>(context: OdooIntegrationContext, metadata: QueryMetadataParams, params?: ApiParams) => {

  if(!metadata.queryName) {
    const msg = 'Developer Error: queryName is required'
    consola.error(msg);
    throw msg;
  }

  if(!context.config.queries || Object.keys(context.config?.queries)?.length == 0) {
    const msg = 'Developer Error: queries must be configured (MiddlewareConfig.queries)'
    consola.error(msg);
    throw msg;
  }

  const query = context.config.queries[metadata.queryName];

  if(!query) {
    const msg = `Developer Error: query ${metadata.queryName} is not configured in middleware`
    consola.error(msg);
    throw msg;
  }

  const response = await context.client.query<ApiResponseType, ApiParams>({
    variables: params,
    query,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
};

