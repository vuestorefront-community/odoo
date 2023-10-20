import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { OdooIntegrationContext } from '..';

export interface QueryMetadataParams {
  queryName: string;
  cacheKey?: string
}
export interface MutationMetadataParams {
  mutationName: string;
}

/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */

  query<ApiParams, ApiResponseType>(context: OdooIntegrationContext, metadata: QueryMetadataParams, params?: ApiParams): Promise<ApolloQueryResult<ApiResponseType>>;
  mutation<ApiParams, ApiResponseType>(context: OdooIntegrationContext, metadata: MutationMetadataParams, params?: ApiParams): Promise<FetchResult<ApiResponseType>>;

}
