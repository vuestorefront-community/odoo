import { FetchResult } from '@apollo/client';
import { MutationApplyCouponArgs, Coupon } from '@erpgap/odoo-sdk-api-client';
import { CustomQuery } from '@vue-storefront/middleware';
import { client } from '../../client';

/**
 * Add one promo coupon to cart
 * 
 * @param {MutationApplyCouponArgs} params
 * @returns { cartApplyCoupon: { coupon: Coupon } }
 * @example
 * ```ts
 *  await sdk.odoo.cartApplyCoupon({ promo: props.product.firstVariant.id, quantity: 1 }); *   
 */
export async function cartApplyCoupon(params: MutationApplyCouponArgs, customQuery?: CustomQuery<'cartApplyCoupon'>) {
  const { data } = await client.post<FetchResult<{ cartApplyCoupon: { coupon: Coupon } }>>('cartApplyCoupon', [params, customQuery]);
  
  return data
}
