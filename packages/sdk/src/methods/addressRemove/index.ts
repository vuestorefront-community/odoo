import { FetchResult } from '@apollo/client';
import { DeleteAddressInput, DeleteAddress } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Remove one product from cart.
 * 
 * @param {DeleteAddressInput} params
 * @returns { deleteAddress: { deleteAddress: DeleteAddress } }
 * @example
 * ```ts
 *  await sdk.odoo.cartRemove({ lineId: 1 });
 * 
 *  await sdk.odoo.cartRemove({ lineId: 1 }, { 'cartRemove': 'customQuery' });
 * ```
 */
export async function deleteAddress(params: DeleteAddressInput, customQuery?: CustomQuery<'deleteAddress'>) {
  const { data } = await client.post<FetchResult<{ deleteAddress: { deleteAddress: DeleteAddress } }>>('deleteAddress', [params, customQuery]);
  
  return data
}


