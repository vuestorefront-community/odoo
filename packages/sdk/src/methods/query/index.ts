import { QueryMetadataParams, Endpoints } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';

/**
 * Query the Odoo API
 * @param metadata The metadata of the query - Example: { queryName: QueryName.GetWebsiteHomepage }
 * @param params The parameters of the query (typed by ApiParams ) - Example: { id: countryId }
 * @returns The response of the query (typed by ApiResponseType)
 */
export async function query<ApiParams, ApiResponseType>(metadata: QueryMetadataParams, params?: ApiParams, opt?: { headers: any }): Promise<ApiResponseType> {
  return await client.post('query', [metadata, params], opt);
}
