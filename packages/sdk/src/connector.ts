import { client } from './client';
import { Options } from './types';
import * as methods from './methods/index';
import { MutationMetadataParams } from '../../sdk-api-client';
import { QueryMetadataParams } from '../../sdk-api-client';
import hash from 'object-hash';

/**
 * Connector methods.
 */
export type Methods = typeof methods;

/**
 * Initialize the Odoo connector.
 */
export const odooConnector = (options: Options): Methods => {
  let mutation = null;
  let query = null;
  let queryNoCache = null;

  mutation = async <ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<ApiResponseType> => {
    return await client.post('mutation', [metadata, params]);
  };

  query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
    return await client.post('query', [metadata, params]);
  };

  queryNoCache = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
    return await client.post('query=no-cache', [metadata, params]);
  };

  if (options.ofetch) {
    mutation = async <ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<ApiResponseType> => {
      return options.ofetch('/api/odoo/mutation', { method: 'POST', body: [metadata, params], cache: 'no-cache', watch: false, ...options.ofetchOptions } as any);
    };

    query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
      const cacheKey = metadata.cacheKey || hash({ ...metadata, ...params });
      return options.ofetch('/api/odoo/query', { method: 'POST', body: [metadata, params], cache: 'no-cache', watch: false, key: cacheKey, ...options.ofetchOptions } as any);
    };

    queryNoCache = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
      const cacheKey = metadata.cacheKey || hash({ ...metadata, ...params });
      return options.ofetch('/api/odoo/query-no-cache', { method: 'POST', body: [metadata, params], cache: 'no-cache', watch: false, key: cacheKey, ...options.ofetchOptions } as any);
    };
  }

  client.defaults.baseURL = options.apiUrl;

  return { query, mutation, queryNoCache };
};
