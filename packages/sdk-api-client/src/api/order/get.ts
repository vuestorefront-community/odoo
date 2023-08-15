
import { Order, QueryOrdersArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './ordersQuery';

export const getOrders: Endpoints['getOrders'] = async (context: OdooIntegrationContext, params?: QueryOrdersArgs, customQuery?: CustomQuery) => {

  const { getOrders } = context.extendQuery(
    customQuery, { getOrders: { query, variables: params } 
  })

  const response = await context.client.query<{ orders: { orders: Order[] } }>({
    variables: getOrders.variables,
    query: getOrders.query
  });

  return response;
};
