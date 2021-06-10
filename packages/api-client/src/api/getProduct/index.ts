
import { CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { Pagination } from '@vue-storefront/odoo-api/src/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, customQuery?: CustomQuery) {

  const response = await context.client.axios.post(`/shop/get_combination_info/${params.productId}`, {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      combination_ids: params.combinationIds.map(id => parseInt(id)),
    }
  });

  return response;

}

