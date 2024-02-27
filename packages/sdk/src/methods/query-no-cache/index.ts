import { ApolloQueryResult } from '@apollo/client';
import { QueryMetadataParams, Endpoints } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';

/**
 * Make the query
 *
 * @example
 */
export async function queryNoCache<ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> {
  return await client.post('query-no-cache', [metadata, params]);
}
