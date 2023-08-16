import { CustomQuery } from '@vue-storefront/middleware';
import { MutationWishlistRemoveItemArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './removeMutation';

export const wishlistRemove: Endpoints['wishlistRemove'] = async (context: OdooIntegrationContext, params: MutationWishlistRemoveItemArgs, customQuery?: CustomQuery) => {
  
  const { wishlistRemove } = context.extendQuery(
    customQuery, { wishlistRemove: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: wishlistRemove.variables,
    mutation: wishlistRemove.mutation,
  });

  return response;
};


