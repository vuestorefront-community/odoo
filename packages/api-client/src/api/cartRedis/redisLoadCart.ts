/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';

export default async function redisLoadCart(context: Context) {
  if (!context.req.session?.cart) {
    context.req.session.cart = {
      orderLines: []
    };
  }
  return { data: context.req.session.cart };
}
