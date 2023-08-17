import { CustomQuery } from '@vue-storefront/middleware';
import { DeleteAddressInput, DeleteAddress } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './removeMutation';

export const deleteAddress: Endpoints['deleteAddress'] = async (context: OdooIntegrationContext, params: DeleteAddressInput, customQuery?: CustomQuery) => {
  
  const { deleteAddress } = context.extendQuery(
    customQuery, { deleteAddress: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: deleteAddress.variables,
    mutation: deleteAddress.mutation,
  });

  return response;
};


