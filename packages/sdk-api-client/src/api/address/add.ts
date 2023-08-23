import { CustomQuery } from '@vue-storefront/middleware';
import { MutationAddAddressArgs, Order } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './addMutation';

export const addAddress: Endpoints['addAddress'] = async (context: OdooIntegrationContext, params: MutationAddAddressArgs, customQuery?: CustomQuery) => {
  
  const { addAddress } = context.extendQuery(
    customQuery, { addAddress: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: addAddress.variables,
    mutation: addAddress.mutation,
  });

  return response;
};


