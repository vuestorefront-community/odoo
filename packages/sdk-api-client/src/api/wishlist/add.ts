import { CustomQuery } from '@vue-storefront/middleware';
import { MutationWishlistAddItemArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from '././addMutation';

export const wishlistAdd: Endpoints['wishlistAdd'] = async (context: OdooIntegrationContext, params: MutationWishlistAddItemArgs, customQuery?: CustomQuery) => {
  
  const { wishlistAdd } = context.extendQuery(
    customQuery, { wishlistAdd: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: wishlistAdd.variables,
    mutation: wishlistAdd.mutation,
  });

  return response;
};


