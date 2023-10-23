import { client } from './client';
import { Options } from './types';
import * as methods from './methods/index';
import { FetchResult } from '@apollo/client';
import { MutationMetadataParams } from '../../sdk-api-client';
import { ApolloQueryResult } from '@apollo/client';
import { QueryMetadataParams } from '../../sdk-api-client';

/**
 * Connector methods.
 */
type Methods = typeof methods;

/**
 * Initialize the Odoo connector.
 */
export const odooConnector = (options: Options): Methods => {
  let mutation = null
  let query = null
  
  mutation = async <ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<ApiResponseType> => {
    return await client.post('mutation', [metadata, params]);
  }

  query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
    return await client.post('query', [metadata, params]);
  }

  if(options.ofetch) {
    mutation = async <ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<ApiResponseType> => {
      return await options.ofetch('/api/odoo/mutation', { method: 'POST', body: [metadata, params], cache: 'no-cache' })
    }
  
    query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> =>{
       return await options.ofetch('/api/odoo/query', { method: 'POST', body: [metadata, params], cache: 'no-cache' })
    }
  }

  client.defaults.baseURL = options.apiUrl

  return { query, mutation };
};
