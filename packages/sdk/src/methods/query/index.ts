import { QueryMetadataParams, Endpoints } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';

/**
 * Make the query
 *
 * @example
 */
export async function query<ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams): Promise<ApiResponseType> {
  return await client.post('query', [metadata, params]);
}
