import { FetchResult } from '@apollo/client';
import { WishlistData } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to cart with specified quantity.
 * 
 * @returns { wishlist: WishlistData }
 * @example
 * ```ts
 *  await sdk.odoo.wishlistLoad();
 * 
 *  await sdk.odoo.wishlistLoad({ 'wishlistLoad': 'customQuery' });    
 * ```
 */
export async function wishlistLoad(customQuery?: CustomQuery<'wishlistLoad'>) {
  const { data } = await client.post<FetchResult<{ wishlist: WishlistData }>>('wishlistLoad', [customQuery]);
  
  return data
}
