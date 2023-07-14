/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';

export default async function redisAddItemToCart(context: Context, product: any): Promise<any> {
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

  context.req.session.cart.orderLines.push({ product });
}
