import { CustomQuery } from '@vue-storefront/middleware';
import { MutationCartAddItemArgs, Order } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './addMutation';

export const addToCart: Endpoints['addToCart'] = async (context: OdooIntegrationContext, params: MutationCartAddItemArgs, customQuery?: CustomQuery) => {
  
  const { addToCart } = context.extendQuery(
    customQuery, { addToCart: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: addToCart.variables,
    mutation: addToCart.mutation,
  });

  return response;
};


