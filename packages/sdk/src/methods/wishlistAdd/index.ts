import { FetchResult } from '@apollo/client';
import { MutationWishlistAddItemArgs, WishlistItem } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one product to wishlist.
 * 
 * @param {MutationWishlistAddItemArgs} params
 * @returns { wishListAddItem: { wishlistItem: WishlistItem } }
 * @example
 * ```ts
 *  await sdk.odoo.wishlistAdd({ productId: props.product.firstVariant.id });
 * 
 *  await sdk.odoo.wishlistAdd({ productId: Number(product.id)};
 * 
 *  await sdk.odoo.wishlistAdd({ productId: product.id }, { 'wishlistAdd': 'customQuery' });
 * ```
 */
export async function wishlistAdd(params: MutationWishlistAddItemArgs, customQuery?: CustomQuery<'wishlistAdd'>) {
  const { data } = await client.post<FetchResult<{ wishlistAddItem: { wishlistItem: WishlistItem } }>>('wishlistAdd', [params, customQuery]); 
  
  return data  
}
