import { FetchResult } from '@apollo/client';
import { MutationMetadataParams } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../index';

/**
 * Make the query
 *
 * @example
 */
export async function mutation<ApiParams, ApiResponseType,>(metadata: MutationMetadataParams, params?: ApiParams): Promise<ApiResponseType> {
  return await client.post('mutation', [metadata, params]);
}
