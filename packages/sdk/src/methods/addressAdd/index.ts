import { FetchResult } from '@apollo/client';
import { MutationAddAddressArgs, AddAddressInput } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to cart with specified quantity.
 * 
 * @param {MutationAddAddressArgs} params
 * @returns { addresses: { addAddressInput: AddAddressInput } }
 * @example
 * ```ts
 *  await sdk.odoo.addAddress({ productId: props.product.firstVariant.id, quantity: 1 });
 * 
 *  await sdk.odoo.addAddress({ productId: Number(product.id), quantity: 1 };
 * 
 *  await sdk.odoo.addAddress({ productId: product.id, quantity: 1 }, { 'cartAdd': 'customQuery' });
 * ```
 */
export async function addAddress(params: MutationAddAddressArgs, customQuery?: CustomQuery<'addAddress'>) {
  const { data } = await client.post<FetchResult<{ addresses: { addAddressInput: AddAddressInput } }>>('addAddress', [params, customQuery]);
  
  return data
}


