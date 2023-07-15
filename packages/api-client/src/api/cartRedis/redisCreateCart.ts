/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';

export default async function redisCreateCart(context: Context): Promise<any> {
  if (!context.req.session?.cart) {
    context.req.session. cart = {
      orderLines: []
    };
  }
}
