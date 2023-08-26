import { CustomQuery } from '@vue-storefront/middleware';
import { MutationApplyCouponArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import mutation from './applyCouponMutation';

export const cartApplyCoupon: Endpoints['cartApplyCoupon'] = async (context: OdooIntegrationContext, params: MutationApplyCouponArgs, customQuery?: CustomQuery) => {
  
  const { cartApplyCoupon } = context.extendQuery(
    customQuery, { cartApplyCoupon: { mutation, variables: params } 
  })

  const response = await context.client.mutate({
    variables: cartApplyCoupon.variables,
    mutation: cartApplyCoupon.mutation,
  });

  return response;
};