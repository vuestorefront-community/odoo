import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { MutationMetadataParams, QueryMetadataParams } from '@erpgap/odoo-sdk-api-client';
import type { Module } from '@vue-storefront/sdk';
import type { Options } from './types';
export interface OdooModuleType extends Module {
  connector: ReturnType<typeof odooConnector>;
}

export const OdooModule = (options: Options): OdooModuleType => {
  
  const mutation = async<ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<FetchResult<ApiResponseType>> => {
    const { data } = await options.fetch.post<FetchResult<ApiResponseType>>('mutation', [metadata, params]);
  
    return data;
  }
  
  const query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApolloQueryResult<ApiResponseType>> => {
    const { data } = await options.fetch.post<ApolloQueryResult<ApiResponseType>>('query', [metadata, params]);
  
    return data;
  }

  return { 
    connector: odooConnector({
      apiUrl: options.apiUrl
    }),
    utils: {},
    subscribers: {}
  }
};


const mutation = async<ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<FetchResult<ApiResponseType>> => {
  const { data } = await client.post<FetchResult<ApiResponseType>>('mutation', [metadata, params]);

  return data;
}

const query = async <ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApolloQueryResult<ApiResponseType>> => {
  const { data } = await client.post<ApolloQueryResult<ApiResponseType>>('query', [metadata, params]);

  return data;
}

const odooConnector = (options: Options) => {
  client.defaults.baseURL = options.apiUrl

  return { mutation, query };
};




export { client } from './client';

export * from './types';
