import { ApolloQueryResult } from '@apollo/client';
import { AddAddressInput, AddressFilterInput } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';  

/**
 * Get a list of address.
 * 
 * @param {AddressFilterInput} params
 * @returns { adresses: { adresses: AddAddressInput[] } }
 * @example
 * ```ts
 *  await sdk.odoo.getAddress({ id: 1 }))
 * 
 *  await sdk.odoo.getAddress({ addressType: [AddressEnum.Billing] }))
 * 
 *  await sdk.odoo.getAddress({ { addressType: [AddressEnum.Billing] } }, { getAddress: 'customQueryName' }}))
 * ```
 */
export async function getAddress(params?: AddressFilterInput, customQuery?: CustomQuery<'getAddress'>) {
  const { data } = await client.post<ApolloQueryResult<{ addresses: { addresses: AddAddressInput[] } }>>('getAddress', [params, customQuery]);
  
  return data
}
