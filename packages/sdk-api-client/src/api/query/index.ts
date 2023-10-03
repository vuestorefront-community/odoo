import { DocumentNode, gql } from '@apollo/client';
import { Endpoints, OdooIntegrationContext, QueryMetadataParams } from '../../types';

export const query: Endpoints['query'] = async <ApiParams, ApiResponseType>(context: OdooIntegrationContext, metadata: QueryMetadataParams, params?: ApiParams) => {
  const query = context.config.queries[metadata.queryName];

  const response = await context.client.query<ApiResponseType, ApiParams>({
    variables: params,
    query,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
};

