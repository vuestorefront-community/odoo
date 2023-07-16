/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';
import { populateCartRedis } from './helper';

export default async function redisAddItemToCart(context: Context, product: any, quantity = 1): Promise<any> {
  if (!context.req.session?.cart) {
    context.req.session. cart = {
      orderLines: []
    };
  }

  // Clean unnecessary attributes for cart
  delete product.attributeValues;
  delete product.variantAttributeValues;
  delete product.categories;
  delete product.jsonLd;
  delete product.schemaAttributeValues;

  const previousAddedItem = context.req.session.cart.orderLines?.find(item => item.product.id === product.id);
  if (previousAddedItem) {
    previousAddedItem.quantity += quantity;

    populateCartRedis(context.req.session.cart);

    return { data: context.req.session.cart };
  }

  context.req.session.cart.orderLines.push({ quantity: quantity, product, id: context.req.session.cart.orderLines.length + 1 });

  populateCartRedis(context.req.session.cart);

  return { data: context.req.session.cart };
}
