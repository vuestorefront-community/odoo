import { CustomQuery } from '@vue-storefront/middleware';
import { MutationCartAddItemArgs, Order } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './addMutation';

export const cartAdd: Endpoints['cartAdd'] = async (context: OdooIntegrationContext, params: MutationCartAddItemArgs, customQuery?: CustomQuery) => {
  
  const { cartAdd } = context.extendQuery(
    customQuery, { cartAdd: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: cartAdd.variables,
    mutation: cartAdd.mutation,
  });

  return response;
};


