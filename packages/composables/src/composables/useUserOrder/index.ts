/* istanbul ignore file */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Context,
  CustomQuery,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { GraphQlOrdersParams, Order } from '@vue-storefront/odoo-api';

const params: UseUserOrderFactoryParams<Order[], GraphQlOrdersParams> = {
  searchOrders: async (context: Context, params: GraphQlOrdersParams & { customQuery?: CustomQuery })=> {

    const { data } = await context.$odoo.api.ordersGet(params, params?.customQuery);

    return data?.orders?.orders || [];
  }
};

export default useUserOrderFactory<Order[], GraphQlOrdersParams>(params);
