/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';

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
    context.req.session.cart.totalItemsInCart = context.req.session.cart.orderLines.length;
    context.req.session.cart.totalItemsInCartWithQuantity = context.req.session.cart.orderLines.reduce((acc, item) => acc + item.quantity, 0);
    return { data: context.req.session.cart };
  }

  context.req.session.cart.orderLines.push({ quantity: quantity, product, id: context.req.session.cart.orderLines.length + 1 });
  context.req.session.cart.totalItemsInCart = context.req.session.cart.orderLines.length;

  return { data: context.req.session.cart };
}
