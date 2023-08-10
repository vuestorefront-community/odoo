import { CustomQuery } from '@vue-storefront/middleware';
import { MutationCartRemoveItemArgs, Order } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './removeMutation';

export const cartRemove: Endpoints['cartRemove'] = async (context: OdooIntegrationContext, params: MutationCartRemoveItemArgs, customQuery?: CustomQuery) => {
  
  const { cartRemove } = context.extendQuery(
    customQuery, { cartRemove: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: cartRemove.variables,
    mutation: cartRemove.mutation,
  });

  return response;
};


