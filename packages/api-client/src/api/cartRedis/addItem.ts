/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';

export default async function cartAddItemRedis(context: Context, product: any): Promise<any> {

  if (!context.req.session?.cart) {
    context.req.session. cart = {
      items: []
    };
  }

  context.req.session.cart.items.push(product);

  console.log(context.req.session.cart.items);

  return null;
}
