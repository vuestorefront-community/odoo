import { FetchResult } from '@apollo/client';
import { MutationRegisterArgs, User } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';


export async function signUpUser(params: MutationRegisterArgs, customQuery?: CustomQuery<'register'>) {
  const { data } = await client.post<FetchResult<{ user: User }>>('register', [params, customQuery]);
  
  return data
}


