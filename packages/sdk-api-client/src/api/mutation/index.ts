import { Endpoints, OdooIntegrationContext, MutationMetadataParams } from '../../types';

export const mutation: Endpoints['mutation'] = async <ApiParams, ApiResponseType>(context: OdooIntegrationContext, metadata: MutationMetadataParams, params?: ApiParams) => {
  const mutation = context.config.queries[metadata.mutationName];

  const response = await context.client.mutate<ApiResponseType, ApiParams>({
    variables: params,
    mutation,
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  return response;
};

