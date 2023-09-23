import { FetchResult } from '@apollo/client';
import { UpdateMyAccountParams, Partner } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';


export async function updateMyAccount(params: UpdateMyAccountParams, customQuery?: CustomQuery<'updateMyAccount'>) {
  const { data } = await client.post<FetchResult<{ partner: Partner }>>('updateMyAccount', [params, customQuery]);
  
  return data
}


