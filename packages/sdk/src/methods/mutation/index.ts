import { FetchResult } from '@apollo/client';
import { MutationMetadataParams } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../index';

/**
 * Make the query
 *
 * @example
 */
export async function mutation<ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams): Promise<FetchResult<ApiResponseType>> {
  const { data } = await client.post<FetchResult<ApiResponseType>>('mutation', [metadata, params]);

  return data;
}
