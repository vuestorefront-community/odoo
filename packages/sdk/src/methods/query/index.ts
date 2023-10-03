import { ApolloQueryResult } from '@apollo/client';
import { QueryMetadataParams, Endpoints } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';

/**
 * Make the query
 *
 * @example
 */
export async function query<ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApolloQueryResult<ApiResponseType>> {
  const { data } = await client.post<ApolloQueryResult<ApiResponseType>>('query', { metadata, params });

  return data;
}
