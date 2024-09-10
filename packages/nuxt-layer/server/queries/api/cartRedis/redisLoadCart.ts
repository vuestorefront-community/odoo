/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';
import { populateCartRedis } from './helper';

export default async function redisLoadCart(context: Context) {
  if (!context.req.session?.cart) {
    context.req.session.cart = {
      orderLines: []
    };
  }

  populateCartRedis(context.req.session.cart);

  return { data: context.req.session.cart };
}
