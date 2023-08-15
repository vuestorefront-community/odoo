import { ApolloQueryResult } from '@apollo/client';
import { Order, Orders, QueryOrdersArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a list of orders.
 * 
 * @param {QueryOrdersArgs} params
 * @returns { Orders: { orders: Order[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getOrders({ pageSize: 12, filter: { id: 13 } }))
 * 
 *  await sdk.odoo.getOrders({ pageSize: 12, filter: { id: 13 } }, { getCategoryList: 'customQueryName' }}))
 * ```
 */
export async function getOrders(params?: QueryOrdersArgs, customQuery?: CustomQuery<'getOrders'>) {
  const { data } = await client.post<ApolloQueryResult<{ orders: { orders: Order[] } }>>('getOrders', [params, customQuery]);
  
  return data
}
