import { FetchResult } from '@apollo/client';
import { MutationWishlistRemoveItemArgs, WishlistItem } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Remove one product from cart.
 * 
 * @param {MutationWishlistRemoveItemArgs} params
 * @returns { wishlistRemoveItem: { wishlistItem: WishlistItem } }
 * @example
 * ```ts
 *  await sdk.odoo.wishlistRemove({ lineId: 1 });
 * 
 *  await sdk.odoo.wishlistRemove({ lineId: 1 }, { 'wishlistRemove': 'customQuery' });
 * ```
 */
export async function wishlistRemove(params: MutationWishlistRemoveItemArgs, customQuery?: CustomQuery<'wishlistRemove'>) {
  const { data } = await client.post<FetchResult<{ wishlistRemoveItem: { wishlistItem: WishlistItem } }>>('wishlistRemove', [params, customQuery]);
  
  return data
}
