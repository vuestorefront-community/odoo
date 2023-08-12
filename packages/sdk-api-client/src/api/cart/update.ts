import { CustomQuery } from '@vue-storefront/middleware';
import { MutationCartUpdateItemArgs, Order } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './updateMutation';

export const cartUpdate: Endpoints['cartUpdate'] = async (context: OdooIntegrationContext, params: MutationCartUpdateItemArgs, customQuery?: CustomQuery) => {
  
  const { cartUpdate } = context.extendQuery(
    customQuery, { cartUpdate: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: cartUpdate.variables,
    mutation: cartUpdate.mutation,
  });

  return response;
};


