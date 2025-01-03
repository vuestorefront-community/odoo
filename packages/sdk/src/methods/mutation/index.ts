import { FetchResult } from '@apollo/client';
import { MutationMetadataParams } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../index';

/**
 * Mutate the Odoo API
 * @param metadata The metadata of the mutation - Example: { mutationName: MutationName.CreateUpdatePartner }
 * @param params The parameters of the mutation (typed by ApiParams ) - Example: { id: countryId }
 * @returns The response of the mutation (typed by ApiResponseType)
 */
export async function mutation<ApiParams, ApiResponseType>(metadata: MutationMetadataParams, params?: ApiParams, opt?: { headers: any }): Promise<ApiResponseType> {
  return await client.post('mutation', [metadata, params], opt);
}
